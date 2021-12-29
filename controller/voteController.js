const jwt = require('jsonwebtoken');
const voteModel = require('../models/voteModel');

const vote_index = (req,res) => {

    res.render('surveys',{});
};

const vote_1 = (req,res) => {
    res.render('polling');
}
const vote_1post = (req,res) => {
    const token = req.cookies.jwt;
    var email;
    jwt.verify(token,'gizli kelime',(err,decodedToken) =>{
        var secmen = {
            mail: decodedToken.email,
            tercih: req.body.aday1
        }
        //son hashi al
        
        res.send(secmen);//{"mail":"ferhatt@gmail.com","tercih":"A Street in Europe"}
    })
}

module.exports = {
    vote_index,
    vote_1,
    vote_1post
}