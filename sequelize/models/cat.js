const Sequelize = require('sequelize');

const dbConnection = require('../db_connection');

class Cat extends Sequelize.Model {

};

Cat.init({
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    image_path: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: dbConnection,
    tableName: "cat",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

module.exports = Cat;