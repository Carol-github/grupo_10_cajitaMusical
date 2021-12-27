//const req = require("../../database/models");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op =db.sequelize.Op;


const apiProductsController = {

        index: (req,res)=>{
            let allProducts = db.Products
            .findAll(
                 {
                order:[['id', 'DESC']],
                attributes:['id', 'title', 'description'],
                where: {deleted : 0},
                // include{
                //     dbRelation:[
                //         'fk_categories', 
                //         'fk_subcategories'
                //     ]
                // }
                
            }
            )
            .then(products =>{
                let result ={
                    metadata:{
                        url: req.originalUrl,
                        quantity:products.length,
                    },
                    data: products,
                    // categories: categoria
                }
                return res.send(result);
            })
            .catch(error=>console.log(error));
        },
        find: (req,res)=>{
            const wow ='wow';
            res.send(wow);
        }
}
module.exports = apiProductsController;
