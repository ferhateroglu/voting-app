const express = require ('express');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');


const voteRoutes = require('./routes/voteRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoutes');
const outRouter = require('./routes/outRouter');
const {requireAuth , checkUser} = require('./middlewares/authMiddleware');

//db connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'password',
    database: 'world'
});

connection.connect((err) =>{
    if(err) throw err;
    console.log('3000 portu dinleniyor');
    app.listen(3000);
});

connection.query('select * from city where id=?',[96],(err,rows)=>{
    console.log(rows);
})


const app = express();
//app.listen(3000);
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






