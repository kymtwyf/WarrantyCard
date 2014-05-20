var ServiceRecord = require('../models/servicerecord');
var ERROR_HELPER = require('./api-helper').handleError;

exports.create = function(req,res){
  var warrantyId = req.body.warrantyId;
  var openReason = req.body.openReason;
  var msg = req.body.message;
  var user = req.session.user?req.session.user:req.body.user;
  var message = {};

  console.log('[ServiceRecord create]the warrantyId is '+warrantyId) ;

  new ServiceRecord({
    warrantyId:warrantyId,
    openReason:openReason
  }).save(function(err,result){
    if(err){
      ERROR_HELPER(req,res,err);
    }else{
      result.insertMessage(user,message)
      .then(function(record){        
        res.send({
          status:'success',
          record:record
        })
      })
      // res.send({
      //       status:'success',
      //       record:result
      //     })
    }
  })


}

exports.search = function(req,res){
  var conditions = req.body.conditions?req.body.conditions:{};

  var fields = req.body.fields;

  var options = req.body.options;

  ServiceRecord.find(conditions,fields,options,function(err,record){
    if(err){
      ERROR_HELPER(req,res,err);
    }else{
      res.send({
        status:'success',
        record:record
      })
    }
  }) 
}

exports.insertMessage = function(req,res){
  var recordId = req.body.recordId;
  var user = req.session.user?req.session.user:req.body.user;
  var message = req.body.message;
  console.log("[ServiceRecord insertMessage] recordId "+ recordId+" user "+ JSON.stringify(user)+" message "+message);
  if(!recordId || !message || message.trim() == ''){
    ERROR_HELPER(req,res,"empty recordId or message");
  }else{
    ServiceRecord.findById(recordId,function(err,record){
      if(err){
        ERROR_HELPER(req,res,err);
      }else{
        if(record){
          record.insertMessage(user,message).then(function(message){
            res.send({
              status:"success",
              record:record
            })
          });
        }else{
          ERROR_HELPER(req,res,"no matched record");
        }
      }
    })
  }
}

exports.closeRecord = function(req,res){
  var rating = req.body.rating?req.body.rating:5;
  var recordId = req.body.recordId;
  var reason = req.body.reason;

  if(!recordId){
    ERROR_HELPER(req,res,"empty recordId");
  }else{
    ServiceRecord.findById(recordId,function(err,record){
      if(err){
        ERROR_HELPER(req,res,err);
      }else{
        record.setRating(rating).then(function(record){
          record.closeRecord(reason).then(function(record){
            res.send({
              status:'success',
              record:record
            })
          })
        })
      }
    })
  }
}
