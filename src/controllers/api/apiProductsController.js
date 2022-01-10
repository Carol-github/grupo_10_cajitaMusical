//const req = require("../../database/models");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const apiProductsController = {
  index: (req, res) => {
    let countCategory = db.Products.count({
      include: ["categoria"],
      where: { deleted: 0 },
      col: "fk_category",
      group: ["categoria.category_name"],
    });

    let allProducts = db.Products.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "title","price", "description"],
      where: { deleted: 0 },
      include: ["categoria"],
    });

    Promise.all([allProducts, countCategory])
      .then(([products, countCategory]) => {
        products = products
          .map((el) => el.get({ plain: true }))
          .map((product) => {
            product.url = `http://localhost:3031/api/productos/${product.id}`;
            product.dbRelations = ["fk_category"];
            return product;
          });

        let countByCategory = {};
        countCategory.forEach((obj) => {
          countByCategory[obj.category_name] = obj.count;
        });

        let result = {
          metadata: {
            url: req.originalUrl,
            quantity: products.length,
            categoryQuantity: countCategory.length,
            categoryByQuantity: countByCategory,
          },
          data: products,
        };
        return res.send(result);
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
