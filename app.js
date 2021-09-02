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