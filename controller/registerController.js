
const register_get = (req,res) =>{
    res.render('register');
}

const register_post = (req,res)=>{
    console.log(req.body);
    res.redirect('/login');
}

module.exports = {
    register_get,
    register_post
}