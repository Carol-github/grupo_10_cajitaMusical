//const req = require("../../database/models");
// const { getEventListeners } = require("mysql2/typings/mysql/lib/Connection");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const apiUserController = {
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

    let allUsers = db.Users.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "user", "email"],
      where: { deleted: 0 },
    });

    let pagedUsers = db.Users.findAll({
      limit: size,
      offset: page * size,
      order: [["id", "DESC"]],
      attributes: ["id", "user", "email"],
      where: { deleted: 0 },
    })


    Promise.all([allUsers, pagedUsers])
    .then(([users, usersPerPage]) => {
        usersPerPage = usersPerPage
          .map((el) => el.get({ plain: true }))
          .map((userPerPage) => {
            userPerPage.url = `http://localhost:3031/api/usuarios/${userPerPage.id}`;
            return userPerPage;
          });
        
        //Aca dependiendo el valor de la pagina en la que estemos posicionados, retornara distintas metadatas con URLs de siguiente o anterior pagina
        if(page == 0){
          let result = {
            metadata: {
              url: req.originalUrl,
              nextPage: `http://localhost:3031/api/usuarios?page=${(page+1)}`,
              quantity: users.length,
            },
            data: usersPerPage,
          };
          return res.send(result);
        } else {
          if(page == (Math.ceil(users.length / size))-1){
            let result = {
              metadata: {
                url: req.originalUrl,
                prevPage: `http://localhost:3031/api/usuarios?page=${(page-1)}`,
                quantity: users.length,
              },
              data: usersPerPage,
            };
            return res.send(result);
          } else {
            let result = {
              metadata: {
                url: req.originalUrl,
                nextPage: `http://localhost:3031/api/usuarios?page=${(page+1)}`,
                prevPage: `http://localhost:3031/api/usuarios?page=${(page-1)}`,
                quantity: users.length,
              },
              data: usersPerPage,
            };
            return res.send(result);
          }
        }


        
      })
      .catch((error) => console.log(error));
  },
  userDetail: (req, res) => {
    let findById = db.Users.findOne({
      where: { id: req.params.id, deleted: 0 },
      attributes: { exclude: ["password", "category_id", "deleted"] },
    });

    Promise.all([findById]).then((user) => {
      if (user[0] === null) {
        res.send("El usuario no existe");
      } else {
        user[0].image = `http://localhost:3031/img/avatars/${user[0].image}`;
        let userToSend = {
          meta: {
            status: 200,
            total: user.length,
            url: req.originalUrl,
          },
          data: user,
        };
        res.json(userToSend);
      }
    });
  },
};

module.exports = apiUserController;
