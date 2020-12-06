const express = require('express');
const router = express.Router();

const catController = require('../controllers/catController');

//* === === === === ROUTE === === === ===
router.get('/cats', catController.getAllCatsFromAPI);
router.post('/cat', catController.addCat);

module.exports = router;