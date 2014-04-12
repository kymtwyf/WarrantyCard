var util = require('util');
var when = require('when');
var User = require('../models/user');
var config = require('../config/config.json');

exports.login = function(req,res){

}
exports.register = function(req,res){
  var lang = req.app.get('locale');
  console.log('the language for the app is '+lang);
  res.render('register',{
    locale:config[lang],
    currentUrl:req.path
  })
}