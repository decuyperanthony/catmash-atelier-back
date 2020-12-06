const homeController = {
    homeApi: (req, res) => {
        try {
            res.send('Hello, welcome on cat-mash API');
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },

};

module.exports = homeController;

