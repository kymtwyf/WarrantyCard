////define all common views here
var util = require('util');
var when = require('when');
var _ = require('underscore');
var User = require('../models/user');
var WarrantyCard = require('../models/warrantycard');
var Appliance = require('../models/appliance');
var ServiceRecord = require('../models/servicerecord');
var config = require('../config/config.json');
exports.viewcard = function(req,res){
  var lang = req.app.get('locale');
  ///KLLLLLLLLL
  var warrantyId = req.param('cardId');
  // var all = [];
  var card = when.defer();
  var records = when.defer();
  var appliance = when.defer();

  // all.push(card.promise);
  // all.push(records.promise);
  // all.push(appliance.promise);
  WarrantyCard.findById(warrantyId,function(err,result){
    if(err){
      card.reject();
    }else{
      card.resolve(result);
      // console.log(result instanceof String);
      // for (var k in result) {
      //     console.log("hallo");
      //     console.log(k+result[k]);
      // }
      // console.log('appliance to find '+result);
      // console.log('appliance to find '+result.appliance);
      Appliance.findById(result.appliance,function(err,result0){
        // console.log("appliance found"+JSON.stringify(result0));
        if(err){
          appliance.reject();
        }else{
          // console.log('the result of appliance is '+result0);
          appliance.resolve(result0);
        }
      })
    }
  })
  ServiceRecord.find({warrantyId:warrantyId},function(err,results){
    if(err){
      records.reject();
    }else{
      results = _.sortBy(results,function(item){
        return -item.openTime;
      })
      records.resolve(results);
    }
  })
  // card.promise.then(function(test){
  //   console.log('test is '+test);
  //   console.log('test is '+JSON.parse(test).appliance);
  //   console.log('test is '+test._id);
  //   console.log("type of test"+ typeof(test));
  // })
  when.all([card.promise,records.promise,appliance.promise]).then(function(values){
    // console.log(JSON.stringify(values));
    console.log("rendering view ");
    console.log('the language for the app is '+lang);
    // console.log("rendering view "+ util.inspect(res));
    console.log('appliance '+util.inspect(values));
    console.log(values[0]._id);
    res.render('viewcard',{
      card:values[0],
      records:values[1],
      appliance:values[2],
      locale:config[lang],
    })
  })

  // card.promise.then(function(card){
  //    res.render('viewcard',{
  //     card:card,
  //     locale:config[lang],
  //   });
  // })

  // res.render('viewcard',{
  //   locale:config[lang],
  //   currentUrl:req.path
  // })
}