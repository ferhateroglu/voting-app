const express = require ('express');
const mongoose = require('mongoose');
const voteRoutes = require('./routes/voteRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRouter = require('./routes/registerRoutes');

//db connection
const dbURL = 'mongodb+srv://yonetici:abc1234@nodeblog.6u3u9.mongodb.net/VotingApp?retryWrites=true&w=majority';
mongoose.connect(dbURL, {useNewUrlParser: true})
.then((result) => app.listen(3000)).catch((error)=>console.log(error));

const app = express();

app.use(express.static('public')) //static ile konuma dışardan erişim izni sağlanır(genelde klasör adı public yapılır ama zorunlu değil)
app.set('view engine', 'ejs'); //view engine change
app.use('/votes',voteRoutes);
app.use('/login',authRoutes);
app.use('/register',registerRouter);


app.get('/',(req,res) =>{
    res.render('home');
})





