const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require("method-override");
const session = require('express-session'); 
const cookieParser = require('cookie-parser');

const userMiddleware = require('./middlewares/userMiddleware')
const cartMiddleware = require('./middlewares/cartMiddleware')

// Middlewares de aplicación

//define la carpeta public donde se guardan las imagenes y css
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(session({
    secret:'Cajita Musical',
    resave: false,
    saveUninitialized:true,
}));
app.use(cookieParser());
//app.use(express.static("./public"));
app.use(express.json());
app.use(userMiddleware);
app.use(cartMiddleware);

//urlencoded nos permite procesar los formularios
app.use(express.urlencoded({extended:false})); 
app.use(methodOverride("_method")); // Permite reconocer req.body

/*Es el Engine Template para estar viendo vistas con ejs*/
app.set('view engine', 'ejs');
app.set('views', './src/views');


app.listen(process.env.PORT || 3031, () => {
    console.log('Servidor funcionando http://localhost:3031');
});

const mainRoutes = require('./routes/mainRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');
const apiUsersRoutes  = require('./routes/api/apiUsersRoutes.js');
const apiProductsRoutes = require('./routes/api/apiProductsRoutes.js');
const authMiddleware = require('./middlewares/authMiddleware.js');
const { create } = require('domain');


app.use('/', mainRoutes);
app.use('/usuarios', usersRoutes);
app.use('/productos', productsRoutes);
app.use('/api/productos', apiProductsRoutes);
app.use('/api/usuarios', apiUsersRoutes);



app.use((req, res, next)=>
    next(createError(404)));
// manejo de errores 404
app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.render ('error/error');
});



