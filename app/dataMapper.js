const db_connection = require('./db_connection');

const dataMapper = {
    getCatByName: (name, callback) => {
        console.log('bjr')
        const query = 'SELECT * FROM "cat" WHERE "name" = $1';
        const values = [name];
        return db_connection.query(query, values, callback);
    },

    addCat: (newCat, callback) => {
        const { name, image_path } = newCat;
        const query = 'INSERT INTO "cat"("name","image_path") VALUES ($1,$2)';
        const values = [name, image_path];
        return db_connection.query(query, values, callback);
    },

    addVote: (catId, callback) => {
        const query = 'INSERT INTO "vote"("cat_id") VALUES ($1)';
        const values = [catId];
        return db_connection.query(query, values, callback);
    },

    getRank: (payload, callback) => {
        const { limit, offset } = payload;
        const query = `SELECT
                        cat.id,
                        cat.name,
                        count(*) as countVote,
                        cat.image_path
                        FROM cat
                        JOIN vote ON cat.id = vote.cat_id
                        GROUP BY cat.id
                        ORDER BY countVote DESC, cat.id DESC
                        LIMIT $1 OFFSET $2
                        `;
        const values = [limit, offset];
        return db_connection.query(query, values, callback);
    },

    getTotalVotes: (cb) => {
        const query = `SELECT COUNT(*) AS total_votes FROM vote`;
        return db_connection.query(query, cb);
    },

    getTotalCats: (cb) => {
        const query = `SELECT COUNT(*) AS total_cats FROM cat`;
        return db_connection.query(query, cb);
    }
};

module.exports = dataMapper;