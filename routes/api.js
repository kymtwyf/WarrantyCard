exports.User = require('./api-user');
exports.WarrantyCard = require('./api-warrantycard');
exports.test = function(req,res){
  res.render('test',{
    locale:'en',
    localeName:'中国'
  });
}