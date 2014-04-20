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
      res.send{
        status:"success",
        appliance:result
      };
    }else{
      res.send{
        status:'error',
        detail:err
      };
    }
  })
}

exports.search = function(req,res){
  var conditions = req.body.conditions;
  var fields = req.body.fields;
  var options = req.body.options;
  var SN,KY,name,id;
  if(conditions){
    SN = conditions.SN;
    KY = conditions.KY;
    name = conditions.name;
    _id = conditions._id;
  }
  Appliance.find(conditions,fields,options,function(err,appliances){
    if(!err){
      res.send{
        status:'success',
        appliances:appliances
      }
    }
    else{
      res.send{
        status:"error",
        detail:err
      }
    }
  })
}