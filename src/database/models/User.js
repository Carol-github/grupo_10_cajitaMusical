module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: dataTypes.STRING
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);

    return User;
}