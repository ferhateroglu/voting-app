const userModel = require('../models/userModel');

const login_get =  (req,res) =>{
    res.render('login');
}

const login_post = async function(req,res){
    const {email, password} = req.body;
    try{
        const user = await userModel.loginUser(email,password);
        console.log(user);
        res.redirect('/votes');
    }catch(e){
        console.log(e);
        res.redirect('login');
    }

}


module.exports = {
    login_get,
    login_post
}