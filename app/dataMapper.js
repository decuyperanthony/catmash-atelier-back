const db_connection = require('./db_connection');

const dataMapper = {
    getCatByName: (name, callback) => {
        const query = 'SELECT * FROM "cat" WHERE "name" = $1';
        const values = [name];
        db_connection.query(query, values, callback);
    },

    addCat: (newCat, callback) => {
        const { name, image_path } = newCat;
        const query = 'INSERT INTO "cat"("name","image_path") VALUES ($1,$2)';
        const values = [name, image_path];
        db_connection.query(query, values, callback);
    }
};

module.exports = dataMapper;