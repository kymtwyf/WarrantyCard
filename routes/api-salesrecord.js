var SalesRecord = require('../models/salesrecord');
var Appliance = require('../models/appliance');
var ERROR_HELPER = require('./api-helper').handleError;

// exports.count = function(req,res){
//   var countFields = ["salesrecord","servicerecord"];
// }

// SalesRecord

exports.create = function(req,res){
  var applianceId = req.body.applianceId;
  var soldPrice = req.body.soldPrice;
  var soldTime = req.body.soldTime;
  var seller = req.body.seller?req.body.seller:req.session.user?req.sesion.user:null;

  if(!applianceId|| !seller){
    ERROR_HELPER(req,res,"empty applianceId or empty seller")
  }else{
    Appliance.findOneById(applianceId,function(err,result){
      if(err){
        ERROR_HELPER(req,res,err)
      }else{
        if(result.status != 'FORSALE'){
          ERROR_HELPER(req,res,"appliance already sold or deleted :"+result.status);
        }else{
          result.setStatus("SOLD");
          new SalesRecord({
            applianceId:applianceId,
            soldPrice:soldPrice,
            soldTime:soldTime,
            seller:seller
          }).save(function(err,appliance){
            if(err){
              ERROR_HELPER(req,res,err)
            }else{
              res.send({
                status:'success',
                appliance:appliance
              })
            }
          })
        }
        
      }
    })
    
  }
}

exports.search = function(req,res){
  
}