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
                // if (products.url == null){
                //     for(i=1 ; products.length ; i++){
                //         products[i].url = `http://localhost:3031/productos/${products.id}`;; 
                //     }                          
                // }  
                       
                let result ={
                    metadata:{
                        url: req.originalUrl,
                        quantity:products.length,
                      countByCategory:[...countByCategory]
                    },
                    data: products,
                }
                return res.send(result);
            })
            .catch(error=>console.log(error));
        },
        productDetail: (req, res) => {
            let findById = 
            db.Products
            .findOne({
              where: { id: req.params.id, deleted: 0 },
            });
    
            Promise.all([findById])
            .then((product) => {              
              if (product[0] === null) {
                res.send("El producto no existe");
              } else {
                product[0].image = `http://localhost:3031/img/imgProducts/${product[0].image}`;
                let productToSend = {
                  meta: {
                    status: 200,
                    total: product.length,
                    url: req.originalUrl                
                  },
                  data: product,
                };
                res.json(productToSend);
              }
            }); 
        }
}
module.exports = apiProductsController;
