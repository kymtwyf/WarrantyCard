var responseTest = {
  name:"test",
  studentId:"102891"
}
var api = require('./api');
module.exports = function(app){
  app.get('/',function(req,res){
    res.writeHead('200',{'Content-Type':'application/json'});
    res.end(JSON.stringify(responseTest));
  });
  //apis
  app.post('/api/register',api.Customer.register);
  app.post('/api/warrantycard/create',api.WarrantyCard.create);

  //views
  app.get('/test',api.test);
  app.get('/register',api.Customer.register);
}
