//const req = require("../../database/models");
// const { getEventListeners } = require("mysql2/typings/mysql/lib/Connection");
const db = require("../../database/models");
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const apiUserController = {
  index: (req, res) => {
    let allUsers = db.Users.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "user", "email"],
      where: { deleted: 0 },
    })
      .then((users) => {
        users = users
          .map((el) => el.get({ plain: true }))
          .map((user) => {
            user.url = `http://localhost:3031/api/usuarios/usuario/${user.id}`;
            return user;
          });
        console.log(users);
        let result = {
          metadata: {
            url: req.originalUrl,
            quantity: users.length,
          },
          data: users,
        };
        // console.log(result)
        return res.send(result);
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
