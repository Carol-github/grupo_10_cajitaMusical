const path = require('path');

const mainController = {
    index: (req, res) => {
        //res.render(path.join(__dirname, '../views/index/index.ejs'));
        res.render('index/index');
    }
}

module.exports = mainController;
