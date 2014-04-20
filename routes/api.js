exports.User = require('./api-user');
exports.WarrantyCard = require('./api-warrantycard');
var config = require('../config/config.json');
exports.test = function(req,res){
  console.log(JSON.stringify(config));
  res.render('test',{
    locale:config.cn,
    // user:{
    //   abc:"ab"
    // }
  });
}