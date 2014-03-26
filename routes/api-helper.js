var util = require('util');
exports.handleError = function(req,res,err){
 
  if(req.body && typeof req.body.redirect === 'string'){
    res.render('errorPage',{
      title:'Error',
      detail:util.inspect(err)
    })
  }else{
    var errorMessage = {
      status:'error',
      detail:util.inspect(err)
    }
    res.send(JSON.stringify(errorMessage));
  }
}