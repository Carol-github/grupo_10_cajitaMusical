//const req = require("../../database/models");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op =db.sequelize.Op;


const apiUserController = {

        index: (req,res)=>{
            let allUsers = db.Users
            .findAll(
                 {
                order:[['id', 'DESC']],
                attributes:['id', 'user', 'email'],
                where: {deleted : 0},
                // include{
                //     dbRelation:[
                //         'fk_categories', 
                //         'fk_subcategories'
                //     ]
                // }
                
            }
            )
            .then(users =>{
                let result ={
                    metadata:{
                        url: req.originalUrl,
                        quantity:users.length,
                    },
                    data: users,
                    // categories: categoria
                }
                return res.send(result);
            })
            .catch(error=>console.log(error));
        } ,
        find: (req,res)=>{
              const wow ='wow';
            res.send(wow);
        }
}
module.exports = apiUserController;
