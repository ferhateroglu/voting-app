const userModel = require('../models/userModel');

const login_get =  (req,res) =>{
    res.render('login');
}

const login_post = async function(req,res){
    const {email, password} = req.body;
    const user = await userModel.loginUser(email,password);

    //res.redirect('/votes');
}


module.exports = {
    login_get,
    login_post
}