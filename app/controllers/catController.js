const API_URL = process.env.CAT_API;
const axios = require('axios');
const dataMapper = require('../dataMapper');
const math = require('../utils/math');


const catController = {
    getAllCatsFromAPI: async (req, res) => {
        try {
            let cats;
            await axios.get(`${API_URL}`)
                    .then((res) => {
                        cats = res.data;
                    })
                    .catch(err => console.trace(err));
            res.send(cats);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    getOneRandomMatch: async (req, res) => {
        try {
            let cats;
            let match = [];
            await axios.get(`${API_URL}`)
                    .then((res) => {
                        cats = res.data;
                    })
                    .catch(err => console.trace(err));
                const catsLength = cats.images.length -1;
                const a = math.getRandomInt(0, catsLength);
                let b = math.getRandomInt(0, catsLength);
                while (a === b) {
                    b = getRandomInt(0, cats.images.length - 1);
                }
                match.push(cats.images[a]);
                match.push(cats.images[b]);
            res.send(match);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    addVoteAndCatIfNotExists: async (req, res) => {
        try {
            const { name } = req.body;
            let catId;
            let message;
            const cat = await dataMapper.getCatByName(name);
            if (cat.rowCount === 0) {
                await dataMapper.addCat(req.body);
                const newCat = await dataMapper.getCatByName(name);
                catId = newCat.rows[0].id;
                message = 'new cat in table cat';
            } else {
                message = 'cat was already saved in database';
                catId = cat.rows[0].id;
            }
            await dataMapper.addVote(catId);
            res.send({
                catId,
                message,
                success: true
            });
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    getCatRanking: async (req, res) => {
        try {
            const catRanking = await dataMapper.getRank(req.query);
            res.send(catRanking.rows);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    getTotalVotes: async (req, res) => {
        try {
            const totalVotes = await dataMapper.getTotalVotes();
            res.send(totalVotes.rows);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    }

};

module.exports = catController;

