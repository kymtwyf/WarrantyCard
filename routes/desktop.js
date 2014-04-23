var config = require('../config/config.json');
exports.user = require('./desktop-user');
exports.warrantycard = require('./desktop-mywarrantycards');
exports.homepage = function(req,res){
  var lang = req.app.get('locale');
  console.log('the language for the app is '+lang);
  res.render('home',{
    locale:config[lang],
    currentUrl:req.path
  })
}