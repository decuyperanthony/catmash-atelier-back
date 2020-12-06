const Sequelize = require('sequelize');

const dbConnection = new Sequelize(process.env.PG_URL_DEV, {
    logging: false
});

module.exports = dbConnection;