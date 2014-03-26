var util = require('util');
var Customer = require('../models/customer');
var ERROR_HELPER = require('./api-helper').handleError;
var USER_NAME_MAX = 16;
var USER_NAME_MIN = 2;
var RESERVED_NAMES = [
  'admin', 'www'
];
var PASSWORD_MAX = 16;
var PASSWORD_MIN = 4;
function validateRegister(req) {
  if (typeof req.body.name !== 'string' ||
      req.body.name.length > USER_NAME_MAX ||
      req.body.name.length < USER_NAME_MIN ||
      req.body.name.length in RESERVED_NAMES)
    return false;
  if (typeof req.body.password !== 'string' ||
      req.body.password.length > PASSWORD_MAX ||
      req.body.password.length < PASSWORD_MIN)
    return false;
  return true;
}
exports.register = function(req, res){
  console.log('the request send by register is:'+util.inspect(req.body));
  console.log('the request send by register is:'+util.inspect(req));

  // res.send(404);
  if(validateRegister(req)){
    var customer = new Customer({
      name:req.body.name,
      password:req.body.password,
      email:req.body.email,
      address:req.body.address?req.body.address:null,
      telephone:req.body.telephone?req.body.telephone:null,
    });
    customer.save(function(err,product){
      if(!err){
        if(req.body.redirect){
          console.log('redirecting to ' + redirect);
          res.redirect(redirect);
        }else{
          res.send(JSON.stringify({
            status:'success',
            user:product
          })
          );
        }
      }else{
        ERROR_HELPER(req,res,err);
      }
    });
  }else{
    var err = {
      reason: 'INVALID-USER'
    }
    ERROR_HELPER(req,res,err);
    // res.send(JSON.stringify(invalidUser));
  }
}

//change including [update, delete]
exports.change = function(req,res){
  console.log('the change request body' + util.inspect(req.body));

}

exports.login = function(req,res){
  console.log('the login request body' + util.inspect(req.body));
  var customer = Customer.findOneByNamePassword(req.body.name,req.body.password);

}

exports.logout = function(req,res){
  console.log('the logout request body' + util.inspect(req.body));
  
}