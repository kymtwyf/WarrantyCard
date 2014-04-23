var util = require('util');
var when = require('when');
var apiWarrantyCard = require('./api').WarrantyCard;
var WarrantyCard = require('../models/warrantycard');
var config = require('../config/config.json');

exports.get = function(req,res){
  var userId = req.session.user._id;
  var lang = req.app.get('locale');
  console.log("----the user id :"+userId);
  var all = when.resolve(apiWarrantyCard.function_searchAllByUser(userId));

  all.then(function(values){
    res.render('mywarrantycards',{
      locale:config.cn,
      cards:values
    })
  })


}