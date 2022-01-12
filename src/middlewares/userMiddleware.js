function userMiddleware (req,res,next){
    if(req.cookies.cajitaMusicalCookie!=undefined &&
      req.session.userLogged ==undefined){
         req.session.userLogged = req.cookies.cajitaMusicalCookie
       console.log('entraste a esta!');
    }next();
   }
 
   

module.exports = userMiddleware;