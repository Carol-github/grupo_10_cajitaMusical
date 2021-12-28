//const req = require("../../database/models");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op =db.sequelize.Op;


const apiProductsController = {

        index: (req,res)=>{
            // let countByCategory = 
            // sequelize.query("SELECT t2.category_name , COUNT(*) FROM products AS t1, product_categories AS t2 WHERE t1.fk_category = t2.id GROUP BY fk_category")

            let countByCategory = db.Products
            .findAll({
                attributes: { 
                    include: [[sequelize.fn("COUNT", sequelize.col("categoria.id")), "categoria.category_name"]] 
                },
                include:['categoria'],
                group: ['fk_category']
            })

            let allProducts = db.Products
            .findAll(
                 {
                order:[['id', 'DESC']],
                attributes:['id', 'title', 'description'],
                where: {deleted : 0},
                include:['categoria']
               
            }
            );
            Promise.all(
                [allProducts, countByCategory]
            )
            .then(([products, countByCategory]) =>{
                console.log(countByCategory);
                let result ={
                    metadata:{
                        url: req.originalUrl,
                        quantity:products.length,
                        // categoryByQuantity:{
                        //     ...categoryQuantity
                        // }
                      countByCategory:[...countByCategory]
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
