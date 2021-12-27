const jwt = require('jsonwebtoken');

//veti tabanı simülasyonu
const userDbSimulation = {
    username: 'ferhat',
    email: 'ferhat@gmail.com',
    password: '$2b$10$uD6wCKH5gOE5BxUH.bDeOe3QtC0KSDp8XO2qR24EhGeo/LJuckAOi'
}

const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'gizli kelime',(err,decodedToken) =>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'gizli kelime',async (err,decodedToken) => {
            if(err){
                console.log(err)
                res.locals.user = null;
            }else{
                //veri tabanından tokenin çekilmesi
                let user = userDbSimulation;
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports ={
    requireAuth,
    checkUser
}