const path = require('path');

const usersController = {
    login: (req, res) => {
        //res.render(path.join(__dirname, '../views/users/login.ejs'));
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    }
}

module.exports = usersController;
