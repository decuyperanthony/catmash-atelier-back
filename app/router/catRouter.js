const express = require('express');
const router = express.Router();

const catController = require('../controllers/catController');

//* GET
router.get('/cats', catController.getAllCatsFromAPI);
router.get('/randommatch', catController.getOneRandomMatch);
router.get('/rank', catController.getCatRanking);

//* POST => ADD VOTE AND CAT (IF CAT NOT EXISTS)
router.post('/cat', catController.addVoteAndCatIfNotExists);

module.exports = router;