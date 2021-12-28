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
    jwt.verify(token,'gizli kelime',(err,decodedToken) =>{
        res.send(decodedToken);
    })
}

module.exports = {
    vote_index,
    vote_1,
    vote_1post
}