const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/dataUsers.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const { validationResult } = require ('express-validator');

// saved = fs.writeFileSync(file, content, 'utf8');

const usersController = {
    login: (req, res) => {       
        res.render('users/login');
    },
    process_login: (req, res) => {
        let user = users.filter(user => req.body.user == user.user);
        if(user.length != 0){
                     
            if(bcrypt.compareSync(req.body.pass, user[0].password )){
                req.session.userLogged = user[0];
                // console.log(req.session.userLogged);
                res.redirect('admin');
            } 
            else{
                res.send('Contraseña incorrecta');
            }
        } else{
            res.send('Usuario incorrecto');
        }
    },

    register: (req, res) => {
        res.render('users/register');
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
                // console.log(users.length)
            const last_position = users.length - 1 ;
            console.log(req.file);
            if(typeof req.file!='undefined'){
                req.body.avatar = req.file.filename; //aca le asignamos el nombre de archivo desde router
            }
            let passEncriptada = bcrypt.hashSync(req.body.password, 10);
            req.body.password = passEncriptada;
            const user = {  
                id: users[last_position].id + 1,
                user: req.body.user,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email:req.body.email,
                password: req.body.password,
                category: "user",
                image:req.body.avatar
            }
            users.push(user);
            // console.log(users);

            const users_saved = JSON.stringify(users, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
            fs.writeFileSync(usersFilePath, users_saved, 'utf-8')

            // let new_user = JSON.stringify(user);       
            res.redirect('/');
        } else { 
            res.render('users/register', { 
                errors: errors.array(),
                old: req.body
                
            });
        }
        
    },
    admin: (req, res) => {
        res.render('users/admin');
    },
    modify: (req, res) => {
        res.render('users/modif');
    },
    
    profile: (req, res) => {
        res.render('users/profile');
    }
    
}

module.exports = usersController;
