const mysql = require('mysql');

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
    //secmen.mail, secmen.tercih
}

// oy sonucu
const voteResult = () =>{
    return 'sonuçlar';
}

const chainData = () =>{
    return 'data';
}