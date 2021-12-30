const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const voteModel = require('../models/voteModel');
const {block, blockchain} = require('../blockChain')

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
            tercih:req.body.aday
        }
    });
    //{"mail":"ferhatt@gmail.com","tercih":"Berlin"}
    voteModel.saveVote(secmen);
    
    res.redirect('/votes/1')
}

//istatistik sayfası
const vote_1result = (req,res) =>{

    let sonuclar = voteModel.voteResult()
    console.log(sonuclar);
    let toplam = sonuclar.aday1+sonuclar.aday2;
    let aday1Oran = 100*sonuclar.aday1/toplam;
    let aday2Oran = 100 - aday1Oran;
    let userDatas = voteModel.chainData();
    
    console.log(userDatas.length);
    
    let myChain = new blockchain();
    //myChain.addBlock(new block('1','ferhatt@gmail.com Londra'));

    for(let i = 0; i< userDatas.length; i++){
        let strData = userDatas[i].mail +'-'+ userDatas[i].oylama +'-'+ userDatas[i].aday 
        myChain.addBlock(new block(i,strData));
    }
    console.log(myChain.chain);
    res.render('statistics',{aday1sayi: sonuclar.aday1, aday2sayi:sonuclar.aday2, aday1: aday1Oran, aday2:aday2Oran});
}

module.exports = {
    vote_index,
    vote_1,
    vote_1post,
    vote_1result
}