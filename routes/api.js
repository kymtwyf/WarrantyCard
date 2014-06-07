exports.User = require('./api-user');
exports.WarrantyCard = require('./api-warrantycard');
exports.Appliance = require('./api-appliance');
exports.ServiceRecord = require('./api-servicerecord');
exports.SalesRecord = require('./api-salesrecord');
exports.Statistics = require('./api-statistics');
exports.Search = require('./api-search');
var config = require('../config/config.json');
exports.test = function(req,res){
  console.log(JSON.stringify(config));
  res.render('mywarrantycards',{
    locale:config.cn,
    cards:[
            {
              number:"123546",
              appliance_name:"PHILLIPS 234E",
              fromDate:new Date(),
              toDate:new Date(),
              appliance_pic_path:"/images/appliances/default.jpg"
            }
          ]
  });
}

exports.upload = function(req,res){
  console.log('test upload');
  res.render('uploadFile',{    locale:config.cn,

  });
}

// exports.prepareData = function(req,res){
//   res.render('test',{
//     locale:config.cn
//   })
// }