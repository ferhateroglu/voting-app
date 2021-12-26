const express = require ('express');
const authController = require('../controller/authController');
const router = express.Router();

router.get('/',authController.login_get);

router.post('/',authController.login_post);

/*router.get('/register',authController.register_get);

router.post('register',authController.register_post);*/


module.exports = router;