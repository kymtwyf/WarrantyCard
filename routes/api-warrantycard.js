var util = require('util');
var WarrantyCard = require('../models/warrantycard');

exports.new = function(req,res){
  console.log(util.inspect(req.body));
  
}