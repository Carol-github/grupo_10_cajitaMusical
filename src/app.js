const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require("method-override");


// Middlewares
app.use(express.static(path.join(__dirname, '../public')));

//app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended:false})); 
app.use(methodOverride("_method")); // Permite reconocer req.body

/*Es el Engine Template*/
app.set('view engine', 'ejs');
app.set('views', './src/views');


app.listen(process.env.PORT || 3030, () => {
    console.log('Servidor funcionando http://localhost:3030');
});

const mainRoutes = require('./routes/mainRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');


app.use('/', mainRoutes);
app.use('/usuarios', usersRoutes);
app.use('/productos', productsRoutes);



