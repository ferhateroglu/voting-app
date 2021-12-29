const express = require('express');
const voteController = require('../controller/voteController');
const router = express.Router();

router.get('/',voteController.vote_index);
router.get('/1',voteController.vote_1);
router.get('/1/result',voteController.vote_1result);
router.post('/1',voteController.vote_1post);


module.exports = router;