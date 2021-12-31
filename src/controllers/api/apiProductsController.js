//const req = require("../../database/models");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op =db.sequelize.Op;


const apiProductsController = {

  index: (req,res)=>{


    let countCategory = db.Products.count({
        include: ['categoria'],
        where: {deleted:0},
        col: 'fk_category',
        group: ['categoria.category_name']
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
        [allProducts, countCategory]
    )
    .then(([products, countCategory]) =>{
        propCategory= [];
        valueCategory= [];
        for(i=0;i<countCategory.length;i++){
            propCategory.push(countCategory[i].category_name)
            valueCategory.push(countCategory[i].count)
        }

        let countByCategory ={};

        propCategory.forEach((categoria,index)=>countByCategory[categoria] = valueCategory[index])



        let result ={
            metadata:{
                url: req.originalUrl,
                quantity:products.length,
                categoryByQuantity:countByCategory

              //countByCategory:[...countByCategory]
            },
            data: products,
            // categories: categoria
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
