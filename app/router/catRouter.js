const express = require('express');
const router = express.Router();

const catController = require('../controllers/catController');

//* GET
router.get('/cats', catController.getAllCatsFromAPI);
router.get('/match', catController.getOneRandomMatch);
router.get('/rank', catController.getCatRanking);
router.get('/totalvotes', catController.getTotalVotes);

//* POST => ADD VOTE AND CAT (IF CAT NOT EXISTS)
router.post('/vote', catController.addVoteAndCatIfNotExists);

module.exports = router;