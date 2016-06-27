var express = require('express');
var app = express();

var router = require('./routes/')

var morgan = require('morgan');
var bodyParser = require('body-parser');

var path = require('path');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.use(function (req, res, next) {

  var err = new Error('Not Found');

  err.status = 404;

  next(err);
})

app.use(function (err, req, res, next) {

    res.status(err.status || 500);

    console.error(err);


});

app.listen(3001, function () {
  console.log('Server is listening on port 3001!');
});



module.exports = app;
