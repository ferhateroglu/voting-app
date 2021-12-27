const bcrypt = require('bcrypt');

//veti tabanı simülasyonu
const userDbSimulation = {
    username: 'ferhat',
    email: 'ferhat@gmail.com',
    password: '$2b$10$uD6wCKH5gOE5BxUH.bDeOe3QtC0KSDp8XO2qR24EhGeo/LJuckAOi'
}

//save user
const saveUser = async function(userObject){
    const salt = await bcrypt.genSalt();
    userObject.password = await bcrypt.hash(userObject.password,salt);
    //register dan gelen kullanıcı
    console.log(userObject);
    /*
     * buraya veri tabanına user ekleme işlemleri gelecek
     * 
     */
}


//login
const loginUser = async function (email,password){
    if(email== userDbSimulation.email){
        const auth = await bcrypt.compare(password,userDbSimulation.password);
        if(auth){
            return userDbSimulation;
        }else{
            throw Error('parola hatalı');
        }
    }else{
        throw Error('Böyle bir kullanıcı yok');
    }
}

module.exports = {
    saveUser,
    loginUser
};