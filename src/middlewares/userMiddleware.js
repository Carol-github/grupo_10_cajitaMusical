function userMiddleware (req,res,next){
    if(req.cookies.cajitaMusicalCookie!=undefined &&
      req.session.userLogged ==undefined){
         req.session.userLogged = req.cookies.cajitaMusicalCookie
       
    }next();
   }
 
   

module.exports = userMiddleware;