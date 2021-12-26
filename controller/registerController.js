const userModel = require('../models/userModel');

const register_get = (req,res) =>{
    res.render('register');
}

const register_post = (req,res)=>{
    userModel.saveUser(req.body)
    .then((result) =>{res.redirect('/login')})
    .catch(e=>console.log(e));
}

module.exports = {
    register_get,
    register_post
}