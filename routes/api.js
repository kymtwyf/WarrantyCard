exports.Customer = require('./api-customer');
exports.WarrantyCard = require('./api-warrantycard');
exports.test = function(req,res){
  res.render('test');
}