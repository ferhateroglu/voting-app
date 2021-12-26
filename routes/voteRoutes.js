const express = require('express');
const voteController = require('../controller/voteController');
const router = express.Router();

router.get('/',voteController.vote_index);
router.get('/1',voteController.vote_id);

module.exports = router;