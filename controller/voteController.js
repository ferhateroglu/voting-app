const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const voteModel = require('../models/voteModel');

const vote_index = (req,res) => {

    res.render('surveys',{});
};

const vote_1 = (req,res) => {
    res.render('polling');
}

// oy ver buttonu
const vote_1post = (req,res) => {
    const token = req.cookies.jwt;
    var secmen;
    jwt.verify(token,'gizli kelime',(err,decodedToken) =>{
        secmen = {
            mail: decodedToken.email,
            tercih: req.body.aday
        }
    });
    //{"mail":"ferhatt@gmail.com","tercih":"Berlin"}
    voteModel.saveVote(secmen);
}

//istatistik sayfası
const vote_1result = (req,res) =>{
    res.render('istatistics');
}

module.exports = {
    vote_index,
    vote_1,
    vote_1post,
    vote_1result
}