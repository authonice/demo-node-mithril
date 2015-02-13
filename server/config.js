var mongoose = require('mongoose');
var colors = require('colors');
var dotenv = require('dotenv');
var fs = require('fs');
var path = require('path');

// load up .env file
if (fs.existsSync(path.join(__dirname, '..', '.env'))){
  dotenv.load();
}

// load real or in-memory database
var mongo_url = process.env.MONGO_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || process.env.MONGOSOUP_URL;
if (!mongo_url){
  console.log(colors.yellow('TODO:'), 'Edit', colors.cyan('.env'), 'and add', colors.green('MONGO_URI'), 'or use a heroku mongodb to run on a real db.');
  var mockgoose = require('mockgoose');
  mockgoose(mongoose);
  mockgoose.reset();
  mongo_url = 'mongodb://localhost/quickstart';
}
mongoose.connect(mongo_url);