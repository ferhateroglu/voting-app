const mysql = require('mysql');
const syncMysql = require('sync-mysql');

const syncConnection = new syncMysql({ 
    host:'localhost', 
    port: '3307',
    user:'root', 
    password:'password', 
    database:'voting'
}) 

//db connection
const connection =  mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'password',
    database: 'voting'
});

connection.connect((err) =>{
    if(err) throw err;
});

//oy Kaydet
const saveVote = (secmen) =>{

    connection.query('call oy_ekle(?,?,?) ', [secmen.mail, 'Bir Tatile Çıksaydın Nereye Giderdin?', secmen.tercih ], (err, res) => {
        if(err) throw err;
        console.log('Oy kullanma başarılı...');
      });
}

// oy sonucu
const voteResult =  function(){

    var res = syncConnection.query('call oy_sayılarını_dondur(?) ', ['Bir Tatile Çıksaydın Nereye Giderdin?']); 
    var sonuclar = {
        aday1: res[0][0].oy_sayisi,
        aday2: res[0][1].oy_sayisi
    }
    return sonuclar;
}

const chainData = () =>{
    var res = syncConnection.query('select* from oy_bilgileri where oylama=?', ['Bir Tatile Çıksaydın Nereye Giderdin?']); 
    return res;
}

module.exports = {
    saveVote,
    voteResult,
    chainData
}