var Appliance = require('../models/appliance');


exports.create = function(req,res){
  var SN = req.body.SN;
  var KY = req.body.KY;
  var name = req.body.name;

  appliance = new Appliance({
    SN:SN,
    KY:KY,
    name:name
  });

  appliance.save(function(err,result){
    if(!err){
      res.send({
        status:"success",
        appliance:result
      });
    }else{
      res.send({
        status:'error',
        detail:err
      });
    }
  })
}

exports.search = function(req,res){
  var conditions = req.body.conditions?req.body.conditions:{};
  var fields = req.body.fields;
  var options = req.body.options;
  var SN,KY,name,id;
  
  Appliance.find(conditions,fields,options,function(err,appliances){
    if(!err){
      res.send({
        status:'success',
        appliances:appliances
      })
    }
    else{
      res.send({
        status:"error",
        detail:err
      });
    }
  })
}

exports.update = function(req,res){
  console.log('the update request :' + util.inspect(req.body));
  var applianceId = req.body.applianceId;
  var conditions = JSON.parse(req.body.conditions);
  var update = JSON.parse(req.body.update);
  // console.log('the conditions is ');
  // console.log(conditions);
  // console.log('the update is ');
  // console.log(update);
    Appliance.find(conditions,function(err,app){
      if(err){
        res.send({
          status:"error",
          detail:err
        })
      }else{

      }
    })
}