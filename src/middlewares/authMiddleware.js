function authMiddleware (req,res,next){
 if(req.session.userLogged!=undefined){
    console.log(req.session.userLogged); 
    next();
 }
 else{
    res.redirect('/usuarios/ingresar');
 }
}

module.exports = authMiddleware;