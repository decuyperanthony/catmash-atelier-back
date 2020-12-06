const API_URL = process.env.CAT_API;
const axios = require('axios');
const dataMapper = require('../dataMapper');


const homeController = {

    getAllCatsFromAPI: async (req, res) => {
        try {
            let cats;
            await axios.get(`${API_URL}`)
                    .then((res) => {
                        cats = res.data;
                    })
                    .catch(err => console.trace(err));
                console.log('cats.length', cats.images.length);
                console.log('cats.images[2]', cats.images[2]);
                res.send(cats);
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

    addCat: async (req, res) => {
        // ici je vais recevoir le cat_name dans le body
        const { name, image_path } = req.body;
        // je check dans la table cat si le chat existe
        await dataMapper.getCatByName(name, (error, data) => {
            if (error) {
                console.trace(error);
                return res.send(error);
            }
            console.log('bonjour');
            if (data.rowCount === 1) {
                // le chat existe déjà en bdd
                // alors on insère pas le chat
                console.log('data', data);
                res.send('le chat est présent en bdd');
            } else {
                // on insert le chat
                dataMapper.addCat(req.body, (error, data) => {
                    if (error) {
                        console.trace(error);
                        res.send(error);
                    }
                    console.log('data à la créa du chat', data)
                    if (data.rowCount === 1) {
                        res.send('chat enregistré avec succes')
                        // lancement mail
                        // console.log(newUser);
                        // mail.mailer(newUser.email);
                    }
                });
            }
        });
        // si il existe next

        // sinon je l'insert dans ma table cats

        // enfin je recup l'id pg du chat et je l'insert dans la table vote


       try {

       } catch (error) {
        console.trace(error);
        res.status(500).send(error);
       }
    }


};

module.exports = homeController;

