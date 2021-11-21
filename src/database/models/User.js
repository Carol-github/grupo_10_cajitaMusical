module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50)
        },
        surname: {
            type: dataTypes.STRING(50)
        },
        user: {
            type: dataTypes.STRING(50)
        },
        email: {
            type: dataTypes.STRING(100)
        },
        password: {
            type: dataTypes.STRING(255)
        },
        image: {
            type: dataTypes.STRING(255)
        },
        address: {
            type: dataTypes.STRING(50)
        },
        idRole: {
            type: dataTypes.INTEGER
        },
        /*deleted:{
            type: dataTypes.BOOLEAN
        }*/
    };
    let config = {
        tableName: 'users',
        timestamps: false,
    };
    const User = sequelize.define(alias, cols, config)

    return User;
}