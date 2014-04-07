var util = require('util');
var User = require('../models/user');
var WarrantyCard = require('../models/warrantycard');
var ERROR_HELPER = require('./api-helper').handleError;

function checkPermission(req){
  //do something here
  return true;
}

function verifyNecessaryInputs(body){
  console.log('[verifyNecessaryInputs] the body to verify '+util.inspect(body));
  var message = [];
  if(!body.SN){
    message.push('empty SN');
  }
  if(!body.KY){
    message.push('empty KY');
  }
  // if(!body.seller){
  //   message.push('empty seller');
  // }
  // if(!body.shop){
  //   message.push('empty shop');
  // }
  if(!body.customer){
    message.push('empty customer');
  }
  return {
    result:message.length == 0? true:false,
    detail:message.join(',')
  }

}
exports.create = function(req,res){
  console.log('[warrantycard.create]'+util.inspect(req.body));
  //TODO: check permission
  var validInput = verifyNecessaryInputs(req.body);
  if(checkPermission(req) && validInput.result){
    console.log('[WarrantyCard.create] approved to be a valid user');
    console.log(WarrantyCard);
    var warr = new WarrantyCard({
      SN:req.body.SN,
      KY:req.body.KY,      
      customer:req.body.customer,
      creator:req.body.creator,
      
      note:req.body.note,
      seller:req.body.seller,
      shop:req.body.shop
    });

    warr.save(function(err,result){
      if(!err){
        if(req.body.redirect){
          console.log('redirecting to ' + redirect);
          res.redirect(redirect);
        }else{
          res.send(JSON.stringify({
            status:'success',
            warrantycard:result
          })
          );
        }
      }else{
        ERROR_HELPER(req,res,err);
      }
    })
  }else{
    if(!validInput.result){
      ERROR_HELPER(req,res,validInput.detail);
    }else{
      console.log('[WarrantyCard.new] approved to be a INVALID user');
      ERROR_HELPER(req,res,'NO PERMISSION');
    }
  }
}
exports.update = function(req,res){
  console.log('[warrantycard.update]'+util.inspect(req.body));

}

exports.search = function(req,res){
  console.log('[warrantycard.search]' + util.inspect(req.body));
  var allErrors = {}
  /*
  //select conditions
  conditions = {
    field1:"abc",
    field2:"def"
  }
  */
  var conditions = req.body.conditions;
 /* var pre_conditions = JSON.parse(req.body.conditions);
 先不考虑这种情况，
  //search for the customer if no _id is offered
  var searchCriterias = [];
  if(pre_conditions.customer && !pre_conditions.customer._id){
    var customer = when.defer();
    User.findOne(pre_conditions,'_id',function(err,user){
      if(err){
        allErrors.findCustomerError = err;
        customer.reject(err);
        console.log('ERROR in warrantycard search when finding the customer');
      }else{
        customer.resolve(user)
      }
    })
    searchCriterias.push(customer.promise);
  }

  var conditions = {}*/

  /*
  //select fields
  fields = "field1 field2"
  */
  var fields = req.body.fields;
  /*
  //specify the options:
  e.g. skip:0,
        limit: 10,
        sort :{
          field1: -1
        }
  */

  var options = req.body.options;

  WarrantyCard.find(conditions,fields,options,function(err,warrantycards){
    if(!err){
      if(req.body.redirect){
        // do something for the page
      }else{
        res.send({
          status:'success',
          warrantycards:warrantycards});
      }
    }else{
      allErrors.findWarrantyCard = err;
    }
  })

}