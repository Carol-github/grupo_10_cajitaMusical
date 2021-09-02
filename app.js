const express = require("express");
const app = express();
let path = require ("path");

app.use(express.static("public"))

app.listen(3030,()=>{
    console.log("http://localhost:3030")
});

app.get ("/",(req, res) => {
    res.sendFile (path.resolve("./views/index.html"));
});
app.get ("/detalle_producto",(req, res) => {
    res.sendFile (path.resolve("./views/product_detail.html"));
});
app.get ("/carrito",(req, res) => {
    res.sendFile (path.resolve("./views/cart.html"));
});
app.get ("/registro",(req, res) => {
    res.sendFile (path.resolve("./views/register.html"));
});
app.get ("/login",(req, res) => {
    res.sendFile (path.resolve("./views/login.html"));
});