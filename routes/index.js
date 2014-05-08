// var responseTest = {
//   name:"test",
//   studentId:"102891"
// }
var api = require('./api');
var desktop = require('./desktop');

function preset(req,res,next){
  res.locals.meta = {};
  res.locals.session = req.session;
  next();

}

function filter(req,res,next){
  // console.log(req);
  console.log('filtering');
  console.log(req.session.user);
  if(!req.session.user){
    res.redirect('/login');
  }else if (req.session.user.role == 'salesman'){
    var valid = false;
    console.log("||| is salesman");
    if(req.route.path.indexOf('/managecards')!= -1){
      invalid = true;
    }

    if(valid){
      res.send(403);
    }else{
      next();
    }
  }else{
    next();
  }
}
module.exports = function(app){
  // app.get('/',function(req,res){
  //   res.writeHead('200',{'Content-Type':'application/json'});
  //   res.end(JSON.stringify(responseTest));
  // });

  //apis
  app.post('/api/warrantycard/create',api.WarrantyCard.create);
  app.post('/api/warrantycard/search',api.WarrantyCard.search);
  app.post('/api/warrantycard/:userId',api.WarrantyCard.searchAllByUser);

  app.post('/api/register',api.User.register);
  app.post('/api/signin',api.User.login);
  app.post('/api/user/update',api.User.update);  
  app.post('/api/user/search',api.User.findAllUsers);
  app.post('/api/user/searchSellers',api.User.searchSellers);
  app.post('/api/user/searchCustomers',api.User.searchCustomers);


  //views
  app.get('/',preset,desktop.customer.homepage);
  app.get('/:id/home',preset,filter,desktop.customer.homepage);
  app.get('/:id/mywarrantycards',preset,filter,desktop.customer.get)
  app.get('/managecards',preset,filter,desktop.salesman.managecards);
  
  app.get('/login',preset,desktop.user.login);
  app.get('/logout',preset,api.User.logout);
  app.get('/register',preset,desktop.user.register);
  app.get('/filter',preset,filter,desktop.user.register);


  //test
  app.get('/test',preset,api.test);

  app.get('/testUpload',api.upload);
 
  app.post('/file-upload',function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    // console.log(req.fields);
  });
  app.get('/*',filter);
}
