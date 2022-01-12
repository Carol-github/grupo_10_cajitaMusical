//const req = require("../../database/models");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const apiProductsController = {
  index: (req, res) => {
    // Guardo en variables lo que ingresa por la URL numero de pagina y cantidad de items por pagina
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    //Por defecto inicia en pagina 0 y limitamos a que solo se consulte por numeros y paginas mayores 0
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    };

    //Por defecto la cantidad de items que mostramos por pagina es 10. Por query pueden ser valores entre 1 y 9
    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }

    //Consulta de las categorias
    let countCategory = db.Products.count({
      include: ["categoria"],
      where: { deleted: 0 },
      col: "fk_category",
      group: ["categoria.category_name"],
    });

    //Consulta del total de productos
    let allProducts = db.Products.findAll({ 
      order: [["id", "DESC"]],
      attributes: ["id", "title","price", "description"],
      where: { deleted: 0 },
      include: ["categoria"],
    });

    //Consulta para paginar los productos por los valores ingresados en la query size y page
    let pagedProducts = db.Products.findAll({
      limit: size,
      offset: page * size,
      order: [["id", "DESC"]],
      attributes: ["id", "title","price", "description"],
      where: { deleted: 0 },
      include: ["categoria"],
    });

    Promise.all([allProducts, countCategory, pagedProducts])
      .then(([products, countCategory, productsPerPage]) => {
        productsPerPage = productsPerPage
          .map((el) => el.get({ plain: true }))
          .map((productsPerPage) => {
            productsPerPage.url = `http://localhost:3031/api/productos/${productsPerPage.id}`;
            productsPerPage.dbRelations = ["fk_category"];
            return productsPerPage;
          });

        let countByCategory = {};
        countCategory.forEach((obj) => {
          countByCategory[obj.category_name] = obj.count;
        });

        //Aca dependiendo el valor de la pagina en la que estemos posicionados, retornara distintas metadatas con URLs de siguiente o anterior pagina
        if(page == 0){
          let result = {
            metadata: {
              url: req.originalUrl,
              quantity: products.length,
              nextPage: `http://localhost:3031/api/productos?page=${(page+1)}`,
              categoryQuantity: countCategory.length,
              categoryByQuantity: countByCategory,
            },
            data: productsPerPage,
          };
          return res.send(result);          
        } else {
          if(page == (Math.ceil(products.length) / size)-1){
            let result = {
              metadata: {
                url: req.originalUrl,
                quantity: products.length,
                prevPage: `http://localhost:3031/api/productos?page=${(page-1)}`,
                categoryQuantity: countCategory.length,
                categoryByQuantity: countByCategory,
              },
              data: productsPerPage,
            };
            return res.send(result);
          } else {
            let result = {
              metadata: {
                url: req.originalUrl,
                quantity: products.length,
                nextPage: `http://localhost:3031/api/productos?page=${(page+1)}`,
                prevPage: `http://localhost:3031/api/productos?page=${(page-1)}`,
                categoryQuantity: countCategory.length,
                categoryByQuantity: countByCategory,
              },
              data: productsPerPage,
            };
            return res.send(result);
          }
        }           
      })
      .catch((error) => console.log(error));
  },
  productDetail: (req, res) => {
    let findById = db.Products.findOne({
      where: { id: req.params.id, deleted: 0 },
    });

    Promise.all([findById]).then((product) => {
      if (product[0] === null) {
        res.send("El producto no existe");
      } else {
        product[0].image = `http://localhost:3031/img/imgProducts/${product[0].image}`;
        let productToSend = {
          meta: {
            status: 200,
            total: product.length,
            url: req.originalUrl,
          },
          data: product,
        };
        res.json(productToSend);
      }
    });
  },
};
module.exports = apiProductsController;
