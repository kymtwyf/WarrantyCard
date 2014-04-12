var util = require('util');
exports.handleError = function(req,res,err){
  var lang = req.app.get('locale');
  if(req.body && typeof req.body.redirect === 'string'){
    console.log('abc');
    res.render('errorPage',{
      title:'Error',
      detail:util.inspect(err),
      locale:locale[lang]
    })
  }else{
    var errorMessage = {
      status:'error',
      detail:util.inspect(err)
    }
    res.send(JSON.stringify(errorMessage));
  }
}