const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const bcrypt = require('bcryptjs');

let db = require("../database/models");
const { restart } = require('nodemon');
const { Console } = require('console');
const sequelize = db.sequelize;

// const usersFilePath = path.join(__dirname, '../data/dataUsers.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require('express-validator');

// saved = fs.writeFileSync(file, content, 'utf8');

const usersController = {
    login: (req, res) => {
        res.render('users/login');
    },
    process_login: (req, res) => {
        // Buscar usuario por email
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Users.findOne({
                where: {
                    email: req.body.email,
                    deleted:0
                                }
            }).then(user => {
                // Si encontramos al usuario

                if (user != undefined) {
                    // Al ya tener al usuario, comparamos las contraseñas

                    if (bcrypt.compareSync(req.body.password, user.password)) {

                        req.session.userLogged = user;
                        // Setear la cookie
                        if (req.body.remember) {
                            res.cookie('userCookie', req.session.userLogged, { maxAge: 60000 * 60 });
                        }
                        // Redireccionamos al usuario al index

                        return res.redirect('/');


                    } else {
                            
                        let errors = [{ msg: 'email o contraseña invalida. O usuario inexistente' }]
                        res.render('users/login', { errors });

                    }
                } else {
                    let errors = [{ msg: 'email o contraseña invalida. O usuario inexistente' }]
                    res.render('users/login', { errors });
                }
            })
        } else {
            res.render('users/login', { errors: errors.errors, old: req.body })
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
        let msgExistUser = 0
        res.render('users/register',{
            msgExistUser
        });
    },
    store: async (req, res) => {
        let errors = validationResult(req);       
        if (errors.isEmpty()) {

            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            }).then(email => {
                // Si encontramos al email
                console.log(email)
                if (email == undefined) {
                    if (typeof req.file != 'undefined') {
                        req.body.avatar = req.file.filename; //aca le asignamos el nombre de archivo desde router
                    }
        
                    let passEncriptada = bcrypt.hashSync(req.body.password, 10);
                    req.body.password = passEncriptada;
        
                        db.Users.create({
                        user: req.body.user,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password,
                        category_id: 2, //Se envia "2" por default, correspondiente a categoria de "Customer"
                        image: req.body.avatar,
                        deleted: 0
                    });
                    res.redirect('/usuarios/ingresar');
                } else {
                    // variable para 
                    let msgExistUser = 1
                    res.render('users/register', {
                        errors: errors.array(),
                        old: req.body,
                        msgExistUser
                           
                    });                    
                }
            
            })                
            
        } else {
            let msgExistUser = 0
            res.render('users/register', {
                errors: errors.array(),
                old: req.body,
                msgExistUser

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
        res.render('users/admin', { userLogged: req.session.userLogged });
    },
    modify: async (req, res) => {
        await db.Users.findByPk(req.session.userLogged.id)
            .then(user => {
                res.render('users/editProfile', {
                    user: user,
                    userLogged: req.session.userLogged 
                });
            })
    },
    delete: async (req, res) => {
       await db.Users.update(
            {deleted: 1}, 
            {
                where: {
                        id: req.session.userLogged.id
                    }
            }
        )
        .then(()=>{
        req.session.destroy();
        res.cookie('cajitaMusicalCookie', null, { maxAge: 1 });
        res.send('hola');
    }
        ) 
        // const newProducts = products.filter(product => product.id != req.params.id)
        // const products_saved = JSON.stringify(newProducts, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
        // fs.writeFileSync(productsFilePath, products_saved, 'utf-8')
    },
    updated: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            if (typeof req.file != 'undefined') {
                req.body.avatar = req.file.filename; //aca le asignamos el nombre de archivo desde router
            }
            // if(req.body.password != undefined) {
            //     let passEncriptada =  bcrypt.hashSync(req.body.password, 10);
            //     req.body.password =  passEncriptada;
            // }
            // else{
            // req.body.password = req.session.userLogged.password
            // }
            await db.Users.update({
                first_name: req.body.user_name,
                last_name: req.body.user_lastname,
                email: req.body.user_email,
                image: req.body.avatar
            },
                {
                    where: {
                        id: req.session.userLogged.id
                    }
                })
              
                    .then(() =>{
                     req.session.userLogged.image = req.body.avatar
                       res.redirect('/')
                    })
        } else {
            res.render('users/modificar', {
                errors: errors.array(),
                old: req.body

            });
        }
    // res.redirect('/');
},
    profile: (req, res) => {
        res.render('users/profile');
    },
logout: (req, res) => {
    // destrucción de la sesión
    req.session.destroy();
    res.cookie('cajitaMusicalCookie', null, { maxAge: 1 });
    res.redirect('/');
}
    
}

module.exports = usersController;
