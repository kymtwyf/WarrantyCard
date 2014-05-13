////define all common views here
exports.viewcard = function(req,res){
  var lang = req.app.get('locale');
  ///KLLLLLLLLL
  console.log('the language for the app is '+lang);
  res.render('customer-home',{
    locale:config[lang],
    currentUrl:req.path
  })
}