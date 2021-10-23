const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const bcrypt = require('bcryptjs');


const usersFilePath = path.join(__dirname, '../data/dataUsers.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// saved = fs.writeFileSync(file, content, 'utf8');

const usersController = {
    login: (req, res) => {
        //res.render(path.join(__dirname, '../views/users/login.ejs'));
        res.render('users/login');
    },
    process_login: (req, res) => {
        //res.render(path.join(__dirname, '../views/users/login.ejs'));
        let papa = req.body;
       //console.log(papa);
        res.redirect('admin');

    },

    register: (req, res) => {
        res.render('users/register');
    },
    store: (req, res) => {
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
    },
    admin: (req, res) => {
        res.render('users/admin');
    },
    modify: (req, res) => {
        res.render('users/modify');
    },
    
    profile: (req, res) => {
        res.render('users/profile');
    }
    
}

module.exports = usersController;
