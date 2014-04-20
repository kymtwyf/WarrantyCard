var util = require('util');
var when = require('when');
var User = require('../models/user');
var config = require('../config/config.json');

exports.login = function(req,res){
  // console.log("working on it [login]")
  var lang = req.app.get('locale');
  res.render('login',{
    locale:config[lang]
  })
}
exports.register = function(req,res){
  var lang = req.app.get('locale');
  console.log('the language for the app is '+lang);
  // res.session.set('username','abcdef');
  res.render('register',{
    locale:config[lang],
    currentUrl:req.path
  })
}

