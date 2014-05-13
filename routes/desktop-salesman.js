var util = require('util');
var when = require('when');
var apiWarrantyCard = require('./api').WarrantyCard;
var WarrantyCard = require('../models/warrantycard');
var config = require('../config/config.json');

//for salesman
exports.createCard = function(req,res){
  var userId = req.session.user._id;
  var lang = req.app.get('locale');

  
  res.render('salesman-newcard',{
    locale:config[lang]
  })
}

exports.managecards = function(req,res){
  var userId = req.session.user._id;
  var lang = req.app.get('locale');
  res.render('salesman-managecards',{
    locale:config[lang]
  })
}