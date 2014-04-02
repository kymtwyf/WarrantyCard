var util = require('util');
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
      shop:req.body.shop,
      createTime:req.body.createTime,
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