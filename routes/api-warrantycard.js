var util = require('util');
var when = require('when');
var _ = require('underscore');
var User = require('../models/user');
var WarrantyCard = require('../models/warrantycard');
var Appliance = require('../models/appliance');

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
  // if(_.isEmpty(req.body)){
  //   req.body = req.fields;
  // }
  var validInput = verifyNecessaryInputs(req.body);
  if(checkPermission(req) && validInput.result){
    console.log('[WarrantyCard.create] approved to be a valid user');
    console.log(WarrantyCard);

    Appliance.findOne({SN:req.body.SN,KY:req.body.KY}).exec(function(err,appliance){
      if(err){
        console.log('error in finding the appliance ');
        ERROR_HELPER(req,res,err);
        return;
      }
      if(!appliance){
        console.log("can't find the appliance with SN and KY number: "+SN+" "+KY);
      }
      var warr = new WarrantyCard({
        SN:req.body.SN,
        KY:req.body.KY,
        appliance:appliance._id,    
        customer:req.body.customer,
        invoicePic:req.files.invoice.path,
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
var function_searchAllByUser = function(userId){
  var ret = when.defer();
  WarrantyCard.find({customer:userId},function(err,cards){
    if(!err){
      var waitValues = [];

      console.log("---------the CARDS ARE "+util.inspect(cards));
      cards.forEach
      (
        function(card){
              // var cardNumber = when.resolve(card._id);
              // var appliance_number = when.defer();
              // var fromDate = when.resolve(card._id.getTimestamp());
              // var toDate = when.resolve(card.expireTime);
              console.log("---------the card is "+util.inspect(card));
              var details = when.defer();
                            // [
                            //   when.resolve(card._id),
                            //   when.defer(),
                            //   when.resolve(card._id.getTimestamp()),
                            //   when.resolve(card.expireTime),
                            //   when.defer()
                            // ];
              Appliance.findById(card.appliance,function(err,appliance){
                if(!err){
                  console.log("----------appliance found "+appliance);
                  var obj = new Object({
                    number:card._id,
                    appliance_name:appliance.name,
                    fromDate:card._id.getTimestamp(),
                    toDate:card.expireTime,
                    appliance_pic_path:appliance.picPath,
                    status:card.status
                  });

                  details.resolve(obj);
                  // details[1].resolve(appliance.name);//appliance_name
                  // details[4].resolve(appliance.picPath);//appliance_pic_path
                }else{
                  console.log("----------error when finding the appliance")
                  // details[1].reject(err);
                  details.reject(err);
                }
              });
      
              waitValues.push(details.promise);
      
        }
      )
      // when.all(waitValues,function(values){
      //   allFound.resolve(values);        
      // },function(Err){
      //   console.log("---------ERROR when .all.waitvalues"+util.inspect(values));
      // })
      when.all(waitValues).then(function(values){
        console.log("----------all the vaues found "+util.inspect(values));
        ret.resolve(values);
      },function(err){
        console.log("----------------error when.all.waitValues"+err)
        ret.reject();
      })
    }else{
      console.log("----------------error when finding Warranty card")
      ret.reject(err);
    }
  });
  return ret.promise;
}
exports.searchAllByUser = function(req,res){
  /*
  return all the detailed information needed for my warranty cards page
  */
  var userId = req.param("userId");
  console.log('the user id is '+userId);
  var allFound = when.resolve(function_searchAllByUser(userId));
  // User.findById()
  allFound.then(function(values){
    res.send(JSON.stringify(values));    
  })

}

exports.function_searchAllByUser = function_searchAllByUser;