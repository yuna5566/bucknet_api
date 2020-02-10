const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://user:' + 
    process.env.MONGO_ATLAS_PW +
    '@cluster-0-uuwvv.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => console.log("Connected to DB"))
.catch(error => {
    console.log("DB ERROR: ", error)
});

//GET AND DECLARE ROUTES...
const entriesRoutes = require('./api/routes/entries');
const usersRoutes = require('./api/routes/users')

//FOR LOGGING PURPOSES ONLY... 
app.use(morgan('dev'))

//PARSES BODY REQUESTS TO MAKE THINGS READABLE (EXCLUDING FILES)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//SET API SERVER TO ALLOW CORS HEADERS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Request-With, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//SET ROUTES/MIDDLEWARES...
app.use('/entry', entriesRoutes);
app.use('/user', usersRoutes);



//For error handlings. When no routes have been detected...
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status,
            message: error.message
        }
    });
})

module.exports = app;