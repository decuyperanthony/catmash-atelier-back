const express = require('express');
const router = express.Router();

// == controller
const homeController = require('../controllers/homeController');

//* === === === === ROUTE === === === ===
router.get('/', homeController.homeApi);

module.exports = router;