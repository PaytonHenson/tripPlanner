var express = require('express');
var app = express();

var swig = require('swig');

var router = require('./routes/')

var morgan = require('morgan');
var bodyParser = require('body-parser');

var path = require('path');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use('/', router);

app.use(function (req, res, next) {

  var err = new Error('Not Found');

  err.status = 404;

  next(err);
});

app.use(function (err, req, res, next) {

    res.status(err.status || 500);

    console.error(err);

});

app.listen(3000, function () {
  console.log('Server is listening on port 3000!');
});



module.exports = app;
