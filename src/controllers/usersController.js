const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const bcrypt = require('bcryptjs');

let db = require("../database/models");
const { restart } = require('nodemon');
const { Console } = require('console');
const sequelize = db.sequelize;

const usersFilePath = path.join(__dirname, '../data/dataUsers.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require ('express-validator');

// saved = fs.writeFileSync(file, content, 'utf8');

const usersController = {
    login: (req, res) => {
        res.render('users/login');
    },
    process_login: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = users.filter(user => req.body.user == user.user);
        if(user.length != 0){
                     
            if(bcrypt.compareSync(req.body.pass, user[0].password )){
                // delete user[0].dataValues.pass
                req.session.userLogged = user[0];

                // SETEAMOS LA COOKIE
                if(req.body.remember){
                    res.cookie(
                        'cajitaMusicalCookie', req.session.userLogged,{maxAge:120000}
                    )
                };
                res.redirect('admin');
            } 
            else{
                res.send('Contraseña incorrecta');
            }
        } else{
            res.send('Usuario incorrecto');
        }
        } else { 
            res.render('users/login', { 
                errors: errors.array(),
                old: req.body
                
            });
        }       

    //     res.render('users/login');
    // },
    // process_login: (req, res) => {
    //     let errors = validationResult(req);
    //     if (errors.isEmpty()) {
    //         let user = users.filter(user => req.body.user == user.user);
    //     if(user.length != 0){
                     
    //         if(bcrypt.compareSync(req.body.pass, user[0].password )){
    //             // delete user[0].dataValues.pass
    //             req.session.userLogged = user[0];

    //             // SETEAMOS LA COOKIE
    //             if(req.body.remember){
    //                 res.cookie(
    //                     'cajitaMusicalCookie', req.session.userLogged,{maxAge:120000}
    //                 )
    //             };
    //             res.redirect('admin');
    //         } 
    //         else{
    //             res.send('Contraseña incorrecta');
    //         }
    //     } else{
    //         res.send('Usuario incorrecto');
    //     }
    //     } else { 
    //         res.render('users/login', { 
    //             errors: errors.array(),
    //             old: req.body
                
    //         });
    //     }
        
    },

    register: (req, res) => {
        res.render('users/register');
    },
    store: async (req, res) => {
        let errors = validationResult(req);
            if (errors.isEmpty()) {  
        
                if(typeof req.file!='undefined'){
                    req.body.avatar = req.file.filename; //aca le asignamos el nombre de archivo desde router
                }

                let passEncriptada = bcrypt.hashSync(req.body.password, 10);
                req.body.password = passEncriptada;
           
                await db.Users.create({            
                         user: req.body.user,
                         first_name: req.body.first_name,
                         last_name: req.body.last_name,
                         email:req.body.email,
                         password: req.body.password,
                         category_id: 1, //Se envia "1" por default, correspondiente a categoria de "Customer"
                         image:req.body.avatar,
                         deleted: 0
                });
                res.redirect('/');
            } else { 
                     res.render('users/register', { 
                         errors: errors.array(),
                         old: req.body
                        
                     });
            }

        // let errors = validationResult(req);
        // if (errors.isEmpty()) {            
        //     const last_position = users.length - 1 ;           
        //     if(typeof req.file!='undefined'){
        //         req.body.avatar = req.file.filename; //aca le asignamos el nombre de archivo desde router
        //     }
        //     let passEncriptada = bcrypt.hashSync(req.body.password, 10);
        //     req.body.password = passEncriptada;
        //     const user = {  
        //         id: users[last_position].id + 1,
        //         user: req.body.user,
        //         first_name: req.body.first_name,
        //         last_name: req.body.last_name,
        //         email:req.body.email,
        //         password: req.body.password,
        //         category: "user",
        //         image:req.body.avatar
        //     }
        //     users.push(user);   

        //     const users_saved = JSON.stringify(users, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
        //     fs.writeFileSync(usersFilePath, users_saved, 'utf-8')

        //     // let new_user = JSON.stringify(user);       
        //     res.redirect('/');
        // } else { 
        //     res.render('users/register', { 
        //         errors: errors.array(),
        //         old: req.body
                
        //     });
        // }
        
    },
    admin: (req, res) => {
        res.render('users/admin', {userLogged: req.session.userLogged});
    },
    modify: (req, res) => {
        res.render('users/modif');
    },
    
    profile: (req, res) => {
        res.render('users/profile');
    },
    logout: (req, res) => {
        // destrucción de la sesión
        req.session.destroy();
        res.cookie('cajitaMusicalCookie', null,{maxAge:1});
        res.redirect('/');
    }
    
}

module.exports = usersController;
