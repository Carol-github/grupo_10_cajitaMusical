const express = require('express');
const app = express();
const path = require('path')

/* app.use(express.static(path.join(__dirname, 'public')));*/
app.use(express.static("./public"));

/*Es el Engine Template*/
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.listen(3030, () => {
    console.log('Servidor funcionando http://localhost:3030');
});

const mainRoutes = require('./routes/mainRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');


app.use('/', mainRoutes);
app.use('/usuarios', usersRoutes);
app.use('/productos', productsRoutes);



/* app.get ("/",(req, res) => {
    res.sendFile (path.resolve("./views/index.html"));
});
app.get ("/detalle_producto",(req, res) => {
    res.sendFile (path.resolve("./views/productDetail.html"));
});
app.get ("/carrito",(req, res) => {
    res.sendFile (path.resolve("./views/productCart.html"));
});
app.get ("/registro",(req, res) => {
    res.sendFile (path.resolve("./views/register.html"));
});
app.get ("/login",(req, res) => {
    res.sendFile (path.resolve("./views/login.html"));
}); */