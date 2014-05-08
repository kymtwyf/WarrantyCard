var util = require('util');
var when = require('when');
var apiWarrantyCard = require('./api').WarrantyCard;
var WarrantyCard = require('../models/warrantycard');
var config = require('../config/config.json');

//for customer
exports.get = function(req,res){
  var userId = req.session.user._id;
  var lang = req.app.get('locale');
  console.log("----the user id :"+userId);
  var all = when.resolve(apiWarrantyCard.function_searchAllByUser(userId));

  all.then(function(values){
    res.render('customer-mywarrantycards',{
      locale:config.cn,
      cards:values
    })
  })
}
exports.search = function(req,res){
  
}
exports.homepage = function(req,res){
  var lang = req.app.get('locale');
  console.log('the language for the app is '+lang);
  res.render('customer-home',{
    locale:config[lang],
    currentUrl:req.path
  })
}