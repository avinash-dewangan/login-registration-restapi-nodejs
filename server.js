const mongoose = require('mongoose')
const express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
// Import the library aLLOW CROS Policy orign:
var cors = require('cors');
const app = express()
// Then use it before your routes are set up:
app.use(cors());


// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//     // Pass to next layer of middleware
//     next();
// });




//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();


app.use(morgan('dev'))


app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))



//Database Setup
// const db = 'mongodb+srv://avinash:avinash@cluster0.osssk.mongodb.net/test?retryWrites=true&w=majority';
// mongoose.connect(process.env.MONGODB_URI || db, {
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Connected to MonogoDB Dababase..."))
    .catch(err => console.log("Database connection error :" + err));


//Router Setup
app.use('/api/todo', require('./routes/toto'))
//import api
var PassCatAPI = require('./api/add-category');
app.use('/api', PassCatAPI);

//import api user
var UserAPI = require('./api/user');
app.use('/userapi', UserAPI);

app.get('/avinash', (req, res) => {
    res.status(200).json({
        message: 'avinash'
    })
})


//Production Setup
if (process.env.NODE_ENV == 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server started port : " + port));


