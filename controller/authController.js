const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const maxAge = 60*60*24;

const createToken = (email) =>{
    return jwt.sign({email},'gizli kelime',{expiresIn: maxAge});
}

const login_get = (req,res) =>{
    res.render('login');
}

const login_post =  function(req,res){
    const {email, password} = req.body;
    try{
        userModel.loginUser(email,password);
        const token = createToken(email);
        res.cookie('jwt',token,{httpOnly: true,maxAge: maxAge*1000});
        res.redirect('/votes');
    }catch(e){
        console.log(e);
        res.redirect('/login');
    }
}



module.exports = {
    login_get,
    login_post
}