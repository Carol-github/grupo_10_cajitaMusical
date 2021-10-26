const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/dataProducts.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/dataCategory.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const subCategoriesFilePath = path.join(__dirname, '../data/dataSubCategory.json');
const subCategories = JSON.parse(fs.readFileSync(subCategoriesFilePath, 'utf-8'));

const productsController = {
    productCart: (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/products/productCart.html'));
        res.render('products/productCart');     
    },
    
    productDetail: (req, res) => {
        //console.log(req.params.id);
        const product = products.filter(product => product.id == req.params.id);
        //console.log(product)
        res.render('products/productDetail',{ product });
    },
    productList: (req, res) => {
        //res.sendFile(path.join(__dirname, '../views/products/productDetail.html'));
        // res.render('products/productList');
        res.render('products/productList',{ products });
    },
    upload: (req, res) => {
       // console.log(categories);
       // console.log(subCategories);
        res.render('products/productUpload',{
            categories : categories,
            subCategories : subCategories  
        });        
    },
    edit: (req, res) => {
        const product = products.filter(product => product.id == req.params.id);
        res.render('products/productEdit',{ 
            product, categories : categories, 
            subCategories : subCategories 
        });
    },
    delete: (req, res) => {
        const newProducts = products.filter(product => product.id != req.params.id)

        // JSON.stringify(output, null, 4) JSON ordenado
        const products_saved = JSON.stringify(newProducts, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
        fs.writeFileSync(productsFilePath, products_saved, 'utf-8')
      
        
        res.redirect('/');
       
    },
       
    updated: (req, res) => {
        
        products.forEach(product => {

            if (product.id == req.params.id) {

                if (typeof req.file != "undefined") {product.image = req.file.filename}   
                
                req.body.offer ? product.oferta = "true" : product.oferta = "false";
               //console.log(product.oferta);  
                                                       
                
                product.title = req.body.prod_name;
                product.price = req.body.prod_price;
                product.category = req.body.prod_cat;
                product.subcategory = req.body.prod_subcat;
                product.description = req.body.prod_desc;
                product.image = product.image;

            }
        })
        // JSON.stringify(output, null, 4) JSON ordenado
        const products_saved = JSON.stringify(products, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
        fs.writeFileSync(productsFilePath, products_saved, 'utf-8')

        res.redirect('/productos/lista');
       
    },
    store: (req, res) => {        
        const last_position = products.length - 1 ;
        console.log(req.file);
        if(typeof req.file!='undefined'){
            req.body.prod_img = req.file.filename; //aca le asignamos el nombre de archivo desde router
        }
        

        const product = {              
            id: products[last_position].id + 1,
            oferta: req.body.offer,
            title: req.body.prod_name,
            price: req.body.prod_price,
            category: req.body.prod_cat,
            subcategory:req.body.prod_subcat,
            description: req.body.prod_desc,
            image: req.body.prod_img
        }
        products.push(product);
        //.log(products);
        

        // JSON.stringify(output, null, 4) JSON ordenado
        const products_saved = JSON.stringify(products, null, 4); //"null, 4" lo usamos para que grabe los nuevos productos en el JSON con saltos de línea
        fs.writeFileSync(productsFilePath, products_saved, 'utf-8')
        
        // let new_user = JSON.stringify(user);       
        res.redirect('lista');
    },
}

module.exports = productsController;