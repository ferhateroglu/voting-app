const register_get = (req,res) =>{
    res.render('register');
}

const register_post = (req,res)=>{
    res.send('deneme');
}

module.exports = {
    register_get,
    register_post
}