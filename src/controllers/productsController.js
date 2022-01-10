const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');


/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */

/*LLAMADO DE DB*/
let db = require("../database/models");
const sequelize = db.sequelize;


const { validationResult } = require('express-validator');

/*GUARDANDO LOS METODOS DE LA LIBRERIA SEQUELIZE*/
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { restart } = require('nodemon');
const { Console } = require('console');
const { title } = require('process');

/*LLAMADO DE PRODUCTOS*/
// const productsFilePath = path.join(__dirname, '../data/dataProducts.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// /*LLAMADO DE CATEGORIES*/
// const categoriesFilePath = path.join(__dirname, '../data/dataCategory.json');
// const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

/*LLAMADO DE SUBCATEGORIES*/
// const subCategoriesFilePath = path.join(__dirname, '../data/dataSubCategory.json');
// const subCategories = JSON.parse(fs.readFileSync(subCategoriesFilePath, 'utf-8'));

/*METODOS*/


const productsController = {
  productCart: (req, res) => {

    // Configuramos el controlador para traer solamente los productos que se fueron cargando en el array req.session.cart
    // a través del método findAll y la condición where para filtrar por id

    db.Products.
      findAll(
        {
          where:
          {
            deleted: 0,
            id: req.session.cart
          }
        }).then((products) => {
          return res.render("products/productCart", {
            products: products,
            userLogged: req.session.userLogged,
          });
        });

  },
  addToCart: (req, res) => {
    let cart = req.session.cart;
    if (!cart.includes(req.body.prodToCart)) {
      req.session.cart.push(req.body.prodToCart);
    }
    res.redirect('/productos/carrito');
  },
  cartDelete: function (req, res) {
    let cart = req.session.cart

    //Posición del elemento a borrar
    let idx = cart.indexOf(req.body.prodToCart)

    //Borrado con método de array splice
    cart.splice(idx, 1);

    // Vuelvo al carrito
    res.redirect("/productos/carrito")
  },

  //MANDA INFO PARA EL DETALLE DE PRODUCTO
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id).then(function (product) {
      if (product.deleted == 0) {
        res.render("products/productDetail", {
          product,
          userLogged: req.session.userLogged,
        });
        /* const product = products.filter(product => product.id == req.params.id);       
                     res.render('products/productDetail',{
                         product,
                         userLogged: req.session.userLogged
                    });    */
      } else {
        res.render("error/error");
      }
    });
  },

  //MANDA INFO PARA LISTA DE PRODUCTOS
  productList: (req, res) => {
    db.Products.findAll({ where: { deleted: 0 } }).then((products) => {
      return res.render("products/productList", {
        products: products,
        userLogged: req.session.userLogged,
      });
    });
    //  res.render('products/productList',{
    //     products,
    //      userLogged: req.session.userLogged });
  },

  /*BARRA DE BUSQUEDA */
  search: async (req, res) => {
    let search = req.query.searchProduct;
    await db.Products.findAll(
      {
        where: {
          deleted: 0,
          title: {
            [Op.like]: `%${search}%`,
          },
        },
      }
    ).then((products) => {
      res.render("products/productList", {
        products: products,
        userLogged: req.session.userLogged,
      });
    });
  },

  //BOTONES DE CATEGORIAS DEL INDEX
  listByCategory: (req, res) => {
   db.ProductCategories.findAll({
      where: { deleted: 0, category_name: req.params.category }
    })
    .then((category)=>{
      console.log(category)
      console.log(category[0].id)
     db.Products.findAll({ where: { deleted: 0, fk_category: category[0].id } })
     .then((products) => {
      console.log(products)
      return res.render("products/productList", {
        products: products,
        userLogged: req.session.userLogged,
      });
    });
    })

 

  },

  //ESTE MANDA LA INFORMACION PARA CREAR PRODUCTO
  upload: async (req, res) => {
    await db.ProductCategories.findAll().then((categories) => {
      sequelize
        .query("SELECT * FROM product_subcategories")
        .then((subCategories) => {
          res.render("products/productUpload", {
            categories: categories,
            subCategories: subCategories[0]
          });
        });
    });
  },

  //MANDA LA INFORMACION PARA EDITAR EL PRODUCTO
  edit: async (req, res) => {
    await db.Products.findByPk(req.params.id).then((product) => {
      sequelize.query("SELECT * FROM product_categories").then((categories) => {
        sequelize.query("SELECT * FROM product_subcategories")
          .then((subCategories) => {
            res.render("products/productEdit", {
              product: product,
              categories: categories[0],
              subCategories: subCategories[0],
            });
          });
      });
    });
    // const product = products.filter(product => product.id == req.params.id);
    // res.render('products/productEdit', {
    //     product, categories: categories,
    //     subCategories: subCategories
    // });
  },

  //ELIMINA EL PRODUCTO
  delete: (req, res) => {
    db.Products.update(
      { deleted: 1 },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() => res.redirect("/"));
    // const newProducts = products.filter(product => product.id != req.params.id)
    // const products_saved = JSON.stringify(newProducts, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
    // fs.writeFileSync(productsFilePath, products_saved, 'utf-8')
  },

  //GUARDA LA MODIFICACION
  updated: (req, res) => {
    if (req.body.offer == undefined) {
      req.body.offer = 0;
    } else {
      req.body.offer = 1;
    }
    if (typeof req.file != "undefined") {
      req.body.image = req.file.filename;
    }
    db.Products.update(
      {
        title: req.body.prod_name,
        offer: req.body.offer,
        price: req.body.prod_price,
        fk_category: req.body.prod_cat,
        image: req.body.image,
        fk_subcategory: req.body.prod_subcat,
        description: req.body.prod_desc,
        deleted: 0,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() => res.redirect("/"));

    // products.forEach(product => {

    //     if (product.id == req.params.id) {

    //         if (typeof req.file != "undefined") { product.image = req.file.filename }

    //         req.body.offer ? product.oferta = "true" : product.oferta = "false";

    //         product.title = req.body.prod_name;
    //         product.price = req.body.prod_price;
    //         product.category = req.body.prod_cat;
    //         product.subcategory = req.body.prod_subcat;
    //         product.description = req.body.prod_desc;
    //         product.image = product.image;

    //     }
    // })
    // // JSON.stringify(output, null, 4) JSON ordenado
    // const products_saved = JSON.stringify(products, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
    // fs.writeFileSync(productsFilePath, products_saved, 'utf-8')

    // res.redirect('/productos/lista');
  },

  //GUARDA EL PRODUCTO NUEVO
  store: async (req, res) => {

    let errors = validationResult(req);
    if (errors.isEmpty()) {

      if (req.body.offer) {
        req.body.offer = 1; //si el check esta tildado, manda el valor "1"
      } else {
        req.body.offer = 0; // si el check esta destildad, manda el valor "0"
      }
      if (typeof req.file != "undefined") {
        req.body.prod_img = req.file.filename; //aca le asignamos el nombre de archivo desde router
      }
      await db.Products.create({
        title: req.body.prod_name,
        offer: req.body.offer,
        price: req.body.prod_price,
        fk_category: req.body.prod_cat,
        fk_subcategory: req.body.prod_subcat,
        description: req.body.prod_desc,
        image: req.body.prod_img,
        deleted: 0,
      });
      res.redirect("/");

    } else {
      await db.ProductCategories.findAll().then((categories) => {
        sequelize
          .query("SELECT * FROM product_subcategories")
          .then((subCategories) => {
            res.render('products/productUpload', {
              errors: errors.array(),
              old: req.body,
              categories: categories,
              subCategories: subCategories[0]
            })
          }
          )
      })
    }
  }
}
module.exports = productsController;