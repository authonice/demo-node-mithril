require('./config.js');

var path = require('path');
var express = require('express');
var app = express();
var lessMiddleware = require('less-middleware');
var browserify = require('browserify-middleware');
var authonice = require('authonice');
var colors = require('colors');
var pubDir = path.resolve(path.join(__dirname,'..', 'client'));

var User = require('./models/User.js');

// mount auth endpoints at /auth
app.use('/auth', authonice.middleware(User, {secret: process.env.TOKEN_SECRET}));

// mount demo API at /api
// app.use('/api', require('./api.js'));

// serve up CSS from LESS. this is efficiently cached.
app.use(lessMiddleware(pubDir, {
  parser:{
    paths:[path.join(__dirname, '..'), path.join(pubDir, 'style')]
  }
}));

// browserify the entry-point. this is efficiently cached if NODE_ENV=production
app.get('/app.js', browserify(path.join(pubDir, 'app', 'index.js'), {}));

// serve up frontend
app.use(express.static(pubDir));

// TODO: implement server-side parsing for initial page-load
app.get('/*', function(req, res){
  res.sendFile(path.join(pubDir, 'index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Please visit', colors.blue(colors.underline('http://localhost:' + port)));
