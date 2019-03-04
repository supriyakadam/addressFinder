var express = require('express');
var app = express();
var bodyParser = require('body-parser')
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/addressData';
mongoose.connect(mongoDB, {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(__dirname + "/frontend"));
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.callback = function (err, data) {
        res.send({
            err: err,
            data: data
        })
    };
    next();
});
//uncomment incase of this error: HttpError: unable to get local issuer certificate
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 
var zipFinderRouter = require('./backend/routers/zipFinderRouter.js');
app.use('/zipFinder', zipFinderRouter);
var addressFinderRouter = require('./backend/routers/addressFinderRouter.js');
app.use('/addressFinder', addressFinderRouter);
app.listen(3000);
