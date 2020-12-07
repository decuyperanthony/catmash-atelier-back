const db_connection = require('./db_connection');

const dataMapper = {
    getCatByName: (name, callback) => {
        console.log('bjr')
        const query = 'SELECT * FROM "cat" WHERE "name" = $1';
        const values = [name];
        return db_connection.query(query, values, callback);
    },

    addCat: (newCat, callback) => {
        console.log('heloooo')
        const { name, image_path } = newCat;
        console.log('newCat in dm', newCat)
        const query = 'INSERT INTO "cat"("name","image_path") VALUES ($1,$2)';
        const values = [name, image_path];
        return db_connection.query(query, values, callback);
    },

    addVote: (catId, callback) => {
        // const { name, image_path } = newCat;
        const query = 'INSERT INTO "vote"("cat_id") VALUES ($1)';
        const values = [catId];
        return db_connection.query(query, values, callback);
    },

    getRank: (callback) => {
        // const query = `SELECT cat.id, cat.name, count(*) as countVote, cat.image_path FROM cat JOIN vote ON cat.id = vote.cat_id GROUP BY cat.id ORDER BY countVote`;
        const query = `SELECT
                        cat.id,
                        cat.name,
                        count(*) as countVote,
                        cat.image_path
                        FROM cat
                        JOIN vote ON cat.id = vote.cat_id
                        GROUP BY cat.id
                        ORDER BY countVote DESC
                        `;
        return db_connection.query(query, callback);
    }
};

module.exports = dataMapper;