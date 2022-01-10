// Middleware de aplicación. Se crea el array para guardar los productos 
function cartMiddleware (req,res,next){
    if(!req.session.cart){

        req.session.cart = [];
    }

    next();
}
 
   

module.exports = cartMiddleware;