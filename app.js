const express = require ('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const voteRoutes = require('./routes/voteRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoutes');
const outRouter = require('./routes/outRouter');
const {requireAuth , checkUser} = require('./middlewares/authMiddleware');

//db connection
const dbURL = 'mongodb+srv://yonetici:abc1234@nodeblog.6u3u9.mongodb.net/VotingApp?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true})
.then((result) => app.listen(3000)).catch((error)=>console.log(error));

const app = express();
app.set('view engine', 'ejs'); //view engine change
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')) //static ile konuma dışardan erişim izni sağlanır(genelde klasör adı public yapılır ama zorunlu değil)
app.use('/votes',requireAuth,voteRoutes);
app.use('/login',authRoutes);
//app.use('logout',outRouter);
app.use('/register',registerRouter);  

app.get('*',checkUser);
app.get('/',(req,res) =>{
    res.render('home');
});
app.get('logout', (req,res) =>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('login');
});





