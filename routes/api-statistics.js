var User = require('../models/user');
var ObjectId = require('../models/database').mongoose.Types.ObjectId;
var WarrantyCard = require('../models/warrantycard');
var Appliance = require('../models/appliance');
var SalesRecord = require('../models/salesrecord');
var ServiceRecord = require('../models/servicerecord');
var ERROR_HELPER = require('./api-helper').handleError;


var when = require('when');
var util = require('util');
var _ = require('underscore');
var moment = require('moment');

// var isDate = function(d){
//   return (d instanceof Date) && isFinite(d);
// }

var availableCounts = ["soldnumber"//销售量
                        ,"soldmoney"//销售额
                        ,"servicenumber"//申请服务量
                        ,"closedservicenumber"//关闭服务量
                        ,"servicerating"//服务评价
                      ]
function objectIdWithTimestamp(timestamp)
{
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof(timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp/1000).toString(16);

    // Create an ObjectId with that hex timestamp
    var constructedObjectId =new ObjectId(hexSeconds + "0000000000000000");

    return constructedObjectId
}
exports.count = function(req,res){

  var dateFrom = new Date(req.body.dateFrom);
  var dateTo = new Date(req.body.dateTo);
  var countType = req.body.countType;
  console.log('countType '+countType);
  console.log("origin from and to dates ");
  console.log(dateFrom);
  console.log(dateTo);
  console.log("changed  from and to dates ");
  dateFrom.setHours(dateFrom.getHours()+8);
  dateTo.setHours(dateTo.getHours()+8);
  console.log(dateFrom);
  console.log(dateTo);
  // var fixedFrom = dateFrom.setHours(dateFrom.getHours()+8);
  // var fixedTo = dateTo.setHours(dateTo.getHours()+8);
  // var timeInterval = req.body.timeInterval;
  if(!_.isDate(dateFrom)|| !_.isDate(dateTo)){
    ERROR_HELPER(req,res,"invalid dateFrom or dateTo");
  }else if(!countType|| !_.contains(availableCounts,countType.toLowerCase())){    
    ERROR_HELPER(req,res,"invalid countType "+countType);
  }else{
    var dateRangeCriteria = {
      $gte:dateFrom,
      $lte:dateTo
    };
    var objectIdRangeCriteria ={
      $gte:objectIdWithTimestamp(dateFrom),
      $lte:objectIdWithTimestamp(dateTo)
    }
    console.log(objectIdRangeCriteria);
    console.log(new ObjectId().getTimestamp());
    // var groupByTime;
    // switch(timeInterval){
    //   case 'day':groupByTime = 
    // }
    switch(countType.toLowerCase()){
      case 'soldnumber':{
        SalesRecord.aggregate([{
            $project:{
              _id:1, // choose only id and soldTime
              soldTime:1
            }
          },{
            $match:{soldTime:dateRangeCriteria}
          },{
            $group:{
              _id:{
                year:{$year:"$soldTime"},
                month:{$month:"$soldTime"},
                day:{$dayOfMonth:"$soldTime"}
              },
              figure : { $sum : 1 }
            }
          }]
          ,function(err,results){
            console.log(results);
            res.send({
              status:"success",
              result:results
            })
          })
        break;
      };
      case 'soldmoney':{
        SalesRecord.aggregate([{
            $project:{
              // _id:1, // choose only id and soldTime
              soldTime:1,
              soldPrice:1
            }
          },{
            $match:{soldTime:dateRangeCriteria}
          },{
            $group:{
              _id:{
                year:{$year:"$soldTime"},
                month:{$month:"$soldTime"},
                day:{$dayOfMonth:"$soldTime"}
              },
              figure : { $sum : "$soldPrice" }
            }
          }]
          ,function(err,results){
            console.log(results);
            res.send({
              status:"success",
              result:results
            })
          })
        break;
      };
      case 'servicenumber':{
        ServiceRecord.aggregate([{
            $project:{
              _id:1, // choose only id and soldTime
              openTime:1
            }
          },{
            $match:{openTime:dateRangeCriteria}
          },{
            $group:{
              _id:{
                year:{$year:"$openTime"},
                month:{$month:"$openTime"},
                day:{$dayOfMonth:"$openTime"}
              },
              figure : { $sum : 1 }
            }
          }]
          ,function(err,results){
            console.log(results);
            res.send({
              status:"success",
              result:results
            })
          })
        break;
      };
      case 'closedservicenumber':{
        ServiceRecord.aggregate([{
            $project:{
              _id:1, // choose only id and soldTime
              closeTime:1
            }
          },{
            $match:{closeTime:dateRangeCriteria}
          },{
            $group:{
              _id:{
                year:{$year:"$closeTime"},
                month:{$month:"$closeTime"},
                day:{$dayOfMonth:"$closeTime"}
              },
              figure : { $sum : 1 }
            }
          }]
          ,function(err,results){
            console.log(results);
            res.send({
              status:"success",
              result:results
            })
          })
        break;
      };
      case 'servicerating':{
        ServiceRecord.aggregate([{
            $match:{isopen:false}
          },{
            $project:{
              _id:1, // choose only id and soldTime
              rating:1
            }
          },{
            $group:{
              _id:"$rating",
              figure : { $sum : 1 }
            }
          }]
          ,function(err,results){
            console.log(results);
            res.send({
              status:"success",
              result:results
            })
          })
        break;
      }
    }
  }

  // console.log(dateFrom);
  // console.log(dateTo);
  // res.send(200);    

}