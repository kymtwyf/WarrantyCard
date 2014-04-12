var responseTest = {
  name:"test",
  studentId:"102891"
}
var api = require('./api');
var desktop = require('./desktop');
module.exports = function(app){
  app.get('/',function(req,res){
    res.writeHead('200',{'Content-Type':'application/json'});
    res.end(JSON.stringify(responseTest));
  });
  //apis
  app.post('/api/register',api.User.register);
  app.post('/api/warrantycard/create',api.WarrantyCard.create);
  app.post('/api/warrantycard/search',api.WarrantyCard.search);
  app.post('/api/login',api.User.login);
  app.post('/api/user/update',api.User.update);
  
  app.post('/api/user/search',api.User.findAllUsers);
  app.post('/api/user/searchSellers',api.User.searchSellers);
  app.post('/api/user/searchCustomers',api.User.searchCustomers);

  //views
  app.get('/test',api.test);
  app.get('/register',desktop.user.register);
}
