var util = require('util');
var when = require('when');
var User = require('../models/user');
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

  // res.send(404);
  if(validateRegister(req)){
    //only customer register is open
    var customer = new User({
      name:req.body.name,
      password:req.body.password,
      email:req.body.email,
      address:req.body.address?req.body.address:null,
      telephone:req.body.telephone?req.body.telephone:null,
      role:'customer'
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

//update including [update, delete]
exports.update = function(req,res){
  console.log('the update request :' + util.inspect(req.body));
  var conditions = JSON.parse(req.body.conditions)
  var update = JSON.parse(req.body.update);
  // console.log('the conditions is ');
  // console.log(conditions);
  // console.log('the update is ');
  // console.log(update);

  if(!req.body.operation || !req.body.conditions){
    console.log("[user.update] NO operation IS SPECIFIED")
  }else{
    if(req.body.operation == "delete"){
      update.status = 'DELETED'
    }else if(req.body.operation == "activate"){
      update.status = 'ACTIVE'
    }
    console.log('the update is:'+ util.inspect(update));
    User.findOneAndUpdate(conditions,update,{new : true},function(err,result){
      console.log("the arguments "+ util.inspect(arguments));
      if(err){
        ERROR_HELPER(req,res,err)
      }else{
        if(req.body.redirect){
          //TODO
        }
        else{
          res.send({
            status:'success',
            updatedUser:result
          });
        }
      }
    })
  }
}

exports.login = function(req,res){
  var ret = when.defer();
  ret.promise.then(function(user){
    if(user == null){
      ERROR_HELPER(req,res,"invalid username or password");
      return;
    }
    console.log('find the user:'+ JSON.stringify(user))
    if(user.status != 'ACTIVE'){
      //TODO deal with it !
    }
    if(req.body.redirect){
      //render the homepage 
    }else{
      res.send(JSON.stringify({
        status:"success",
        user:{
          name:user.name,
          email:user.email,
          role:user.role,
          _id:user._id
        }
      }))
    }
  },function (err){
    ERROR_HELPER(req,res,err)
  });
  console.log('the login request body' + util.inspect(req.body));
  
  if(!req.body.name || !req.body.password){
    ret.reject("empty name or password");
  }
  var user = User.findOneByNamePassword(req.body.name,req.body.password);
  user.exec(function (err, user){
    if(err){
      ERROR_HELPER(req,res,err)
    }else{
      ret.resolve(user)
    }
  })

}

exports.logout = function(req,res){
  console.log('the logout request body' + util.inspect(req.body));
  
}

var findAllUsers = function(req,res){
  var conditions = req.body.conditions?req.body.conditions:{};
  var fields = req.body.fields;
  switch(req.body.userRole){
    case 'customer':conditions.role = 'customer'; break;
    case 'seller':conditions.role = 'seller'; break;
    default :;
  }
  var options = req.body.options;

  User.find(conditions,fields,options,function(err,users){
    if(!err){
      if(req.body.redirect){
        // do something here
      }else{
        //for API
        res.send({
          status:'success',
          users:users
        });
      }
    }else{
      //HANDLE ERROR HERE
      ERROR_HELPER(req,res,err)
    }
  })
}

exports.searchCustomers = function(req,res){
  console.log('[api-user] searchAllCustomers '+ util.inspect(req.body));
  req.body.userRole = 'customer';
  findAllUsers(req,res);
}

exports.searchSellers = function(req,res){
  console.log('[api-user] searchAllSellers '+ util.inspect(req.body));
  req.body.userRole = 'seller';
  findAllUsers(req,res);
}

exports.findAllUsers = findAllUsers;

// exports.promiseSearchOne = function(conditions,fields,options){
//   var ret = when.defer();
//   User.findOne(conditions,fields,options,function(err,user){
//     if(!err){
//       ret.resolve(user);
//     }else{
//       ret.reject(err);
//     }
//   })
//   return ret.promise;
// }

// exports.promiseSearchAll = function(conditions){

// }

