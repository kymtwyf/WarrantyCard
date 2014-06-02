var util = require('util');
exports.handleError = function(req,res,err){
  var lang = req.app.get('locale');
  // if(req.body && typeof req.body.redirect === 'string'){
  //   console.log('abc');
  //   // res.redirect(req.body.redirect);
  //   // console.log(res);
  //   res.render('error',{
  //     title:'Error',
  //     detail:util.inspect(err),
  //     locale:locale[lang]
  //   },function(err,html){
  //     if(err){
  //       console.log("!!! handleError "+ err);
  //     }else{
  //       console.log("seems to be ok" + html);
  //     }
  //   })
  // }else{
    var errorMessage = {
      status:'error',
      detail:util.inspect(err)
    }
    res.send(errorMessage);
  // }
}