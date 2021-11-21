module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.FLOAT
        },
        total: {
            type: dataTypes.DECIMAL
        },
        idUser: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'cart',
        timestamps: false
    };
    const Cart = sequelize.define(alias, cols, config)

    return Cart;
}