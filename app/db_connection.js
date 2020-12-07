const Sequelize = require('sequelize');

const dbConnection = new Sequelize(process.env.PG_URL, {
    logging: false
});

module.exports = dbConnection;