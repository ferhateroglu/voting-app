const express = require('express');
const registerController = require('../controller/registerController');
const router = express.Router();

router.get('/',registerController.register_get);
router.post('/',registerController.register_post);

module.exports = router;