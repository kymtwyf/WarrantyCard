var User = require('../models/user');
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
exports.count = function(req,res){

  var dateFrom = new Date(req.body.dateFrom);
  var dateTo = new Date(req.body.dateTo);
  var countType = req.body.countType;

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
              count : { $sum : 1 }
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
        break;
      };
      case 'servicenumber':{
        break;
      };
      case 'closedservicenumber':{
        break;
      };
      case 'servicerating':{
        break;
      }
    }
  }

  // console.log(dateFrom);
  // console.log(dateTo);
  // res.send(200);    

}