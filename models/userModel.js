const bcrypt = require('bcrypt');
const e = require('express');
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


//save user
const saveUser = async function(userObject){
    const salt = await bcrypt.genSalt();
    userObject.password = await bcrypt.hash(userObject.password,salt);
    //register page dan gelen kullanıcı
    console.log(userObject);

    var _ilce_id;
    var ilce_adi =userObject.ilce; // kullanıcın kayıt olurken sectigi ilce adı olacak burda

    connection.query('select ilce_adına_gore_ilce_id_dondur(?) as ilce_id',ilce_adi, (err, res) => {
    if(err) throw err;
    console.log('ilce ID:', res[0].ilce_id);
    _ilce_id=res.ilce_id; // donen deger _ilce_id ye atanacak
   });

   var girdi = { 
    ad: userObject.username ,
    soyad: userObject.lastname ,
    mail: userObject.email ,// unique olması gerek
    password_token: userObject.password ,
    cinsiyet_id: userObject.gender ,
    ilce_id: _ilce_id ,//usteki fonskiyondan donen deger
    dogum_tarihi: userObject.birth//Kullanıcı 12 yasından kucuk olamaz 
    };


    connection.query('INSERT INTO tbl_kullanıcılar SET ?', girdi, (err, res) => {
        if(err) throw err;
      
        console.log('Last insert ID:', res.insertId);
      });

};

//login

const loginUser =  function(email,password){
    connection.query(`Select * from tbl_kullanıcılar where mail='${email}'`,(err, res) => {
        if(err) throw err;
        if(!res.length){
            throw Error('username or password in correct')
        }
        bcrypt.compare(password, res[0].password_token, (bErr, bResult)=>{
            if(bErr){
                throw Error('username or password in correct')
            }
            if(bResult){//password match
                return email
            }
        })
    });
}


module.exports = {
    saveUser,
    loginUser
};