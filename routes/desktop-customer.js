var util = require('util');
var http = require('http');
var when = require('when');
var crypto = require('crypto');

var querystring = require('querystring');
var _ = require('underscore');
var apiWarrantyCard = require('./api').WarrantyCard;
var WarrantyCard = require('../models/warrantycard');
var config = require('../config/config.json');

//for customer
exports.get = function(req,res){
  var userId = req.session.user._id;
  var lang = req.app.get('locale');
  console.log("----the user id :"+userId);
  var all = when.resolve(apiWarrantyCard.function_searchAllByUser(userId));

  all.then(function(values){
    values = _.sortBy(values,function(o) {return -o.fromDate.getTime()})
    res.render('customer-mywarrantycards',{
      locale:config.cn,
      cards:values
    })
  })
}
exports.search = function(req,res){
  
}
exports.homepage = function(req,res){
  var lang = req.app.get('locale');
  console.log('the language for the app is '+lang);
  res.render('customer-home',{
    locale:config[lang],
    currentUrl:req.path
  })
}

exports.myappliances = function(req,res){
//   var userId = req.param("id")//req.session.user._id;
// // console.log("[myappliance]user id "+userId);
//   var lang = req.app.get('locale');

//   console.log("----the user id :"+userId);

//   var cards = when.defer();

//   var post_data_cards = querystring.stringify({
//     conditions:{
//       customer:userId
//     }
//   })
//   var options_cards = {
//     hostname: 'localhost',
//     port: 3000,
//     path: '/api/warrantycard/search',
//     method: 'POST'
//   }
//   var options_appliances = {
//       hostname: 'localhost',
//       port: 3000,
//       path: '/api/appliance/search',
//       method: 'POST'
//     };

//   var req_cards = http.request(options_cards,function(res){
//     console.log('STATUScards: ' + res.statusCode);
//     console.log('HEADERScards: ' + JSON.stringify(res.headers));
//     var alldata = "";
//     res.on('data',function(data){
//        alldata+=data;
//     })
//     res.on('end',function(){
//       // console.log(JSON.stringify(alldata));
//       console.log(alldata);
//       cards.resolve(alldata);
//     })
//   })

//   req_cards.write(post_data_cards);
//   req_cards.end();

//   cards.then(function(cards,err){
//     if(err){
//       // res.send({
//       //   status:
//       // })
//      console.log("error in desktop customer [][][][]"+err);
//     }else{
//       for(card in cards){

//       }
//     }
//   })  

  var userId = req.session.user?req.session.user._id:req.param("id");
  var lang = req.app.get('locale');
  console.log("----the user id :"+userId);
  var all = when.resolve(apiWarrantyCard.function_searchAllByUser(userId));

  all.then(function(values){
    values = _.sortBy(values,function(o) {if(o.card.status == 'ACTIVE') return 1; else return 0;})
    res.render('customer-myappliance',{
      locale:config.cn,
      cards:values
    })
  })
}

exports.myprofile = function(req,res){
  var userId = req.session.user?req.session.user._id:req.param("id");
  var lang = req.app.get('locale');
  console.log('the language for the app is '+lang);
  res.render('personal-info',{
    locale:config[lang],
    md5:function(str){return crypto.createHash('md5').update(str).digest('hex')}
  })
}