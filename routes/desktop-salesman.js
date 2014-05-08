var util = require('util');
var when = require('when');
var apiWarrantyCard = require('./api').WarrantyCard;
var WarrantyCard = require('../models/warrantycard');
var config = require('../config/config.json');

//for salesman
exports.new = function(req,res){
  
}

exports.managecards = function(req,res){
  var lang = req.app.get('locale');
  res.render('salesman-managecards',{
    locale:config[lang]
  })
}