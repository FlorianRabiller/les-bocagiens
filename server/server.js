const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

require('dotenv').config({path: '.env'});

const { checkUser, requireAuth } = require('./middleware/auth.middleware');

const app = express();

const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// JWT 

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//ROUTES

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


//SERVER
app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

app.get('/', (res, req) => {
    res.send('Connecté à la base de donnée');
})

mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.t5ili.mongodb.net/les-bocagiens', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.log('Failed to connect to MongoDB', err));