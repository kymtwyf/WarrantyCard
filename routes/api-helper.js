exports.handleError = function(req,res,err){
 
  if(req.body && typeof req.body.redirect === 'string'){
    res.render('errorPage',{
      title:'Error',
      detail:err
    })
  }else{
    var errorMessage = {
      status:'error',
      detail:err
    }
    res.send(JSON.stringify(errorMessage));
  }
}