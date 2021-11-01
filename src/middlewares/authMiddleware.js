function authMiddleware (req,res,next){

 if(req.session.userLogged!=undefined){
  // res.locals.userLogged = false;
   // if (req.cookies.cajitaMusicalCookie){
   //    req.session.userLogged = req.cookies.cajitaMusicalCookie;
   // }else{
   //    res.locals.userLogged = req.session.userLogged;
   // }
   next();
 }
//  else{
//    if (req.cookies.cajitaMusicalCookie){
//       req.session.userLogged = req.cookies.cajitaMusicalCookie;
//       console.log('existe la cookie');
//       next ();
//    } 
else {
      res.redirect('/usuarios/ingresar');
   }
   }


module.exports = authMiddleware;