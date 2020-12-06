const express = require('express');
const router = express.Router();

// == controller
const homeController = require('../controllers/homeController');

//* === === === === ROUTE === === === ===
router.get('/', homeController.homeApi);

// Route 404
router.use((req, res) => {res.status(404).send('404, cette route n existe pas')});


module.exports = router;