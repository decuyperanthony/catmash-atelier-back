const Sequelize = require('sequelize');

const dbConnection = require('../db_connection');

class Vote extends Sequelize.Model {

};

Vote.init({

}, {
    sequelize: dbConnection,
    tableName: "vote",
    createdAt: "created_at",
    updatedAt: "updated_at"
})

module.exports = Vote;