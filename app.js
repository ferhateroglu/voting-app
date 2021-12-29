const express = require ('express');
const cookieParser = require('cookie-parser');

const voteRoutes = require('./routes/voteRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoutes');
const outRouter = require('./routes/outRouter');
const {requireAuth , checkUser} = require('./middlewares/authMiddleware');
const { render } = require('express/lib/response');



const app = express();
app.listen(3000);

//app.listen(3000);
app.set('view engine', 'ejs'); //view engine change
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')) //static ile konuma dışardan erişim izni sağlanır(genelde klasör adı public yapılır ama zorunlu değil)

app.use('/login',authRoutes);
app.use('/register',registerRouter);
app.use('/votes',requireAuth,voteRoutes);

app.get('*',checkUser);
app.get('/',(req,res) =>{
    res.render('home');
});
app.get('/about', (req,res) =>{
    res.render('about');
});
app.get('/logout', (req,res) =>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('login');
});
/*
app.get('/logout', (req,res) =>{
    res.send
    /*res.cookie('jwt','',{maxAge:1});
    res.redirect('login');
});*/






