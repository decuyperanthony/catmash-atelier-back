const API_URL = process.env.CAT_API;
const axios = require('axios');
const { Cat, Vote } = require('../models');
const { Sequelize } = require('sequelize');
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
        const { name } = req.body;
        try {
            let catId;
            let message;
            const cat = await Cat.findOne({
              where: {
                  name
              }
            });
            if (!cat) {
                const newCat = new Cat(req.body);
                const savedCat = await newCat.save();
                catId = savedCat.dataValues.id;
                message = 'new cat in table cat';
            } else {
                message = 'cat was already saved in database';
                catId = cat.dataValues.id;
            }
            const newVote = new Vote({
                cat_id: catId
            });
            const savedVote = await newVote.save();
            res.send({
                catId,
                message,
                vote: savedVote.dataValues
            });

        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    getCatRanking: async (req, res) => {
        try {
            const catRanking = await Vote.findAll({
                group: ['cat_id', 'cat.id'],
                attributes: [
                    'cat_id',
                    [Sequelize.fn('COUNT', 'cat_id'), 'votecount'],
                ],
                include: [{
                    model: Cat, as: "cat",
                }],
                order: [[Sequelize.literal('votecount'), 'DESC']]
            });
            res.send(catRanking);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

};

module.exports = catController;