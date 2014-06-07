var util = require('util');
var when = require('when');
var ObjectId = require('../models/database').mongoose.Types.ObjectId
var apiWarrantyCard = require('./api').WarrantyCard;
var WarrantyCard = require('../models/warrantycard');
var Appliance = require('../models/appliance');
var User = require('../models/user');
var config = require('../config/config.json');
var crypto = require('crypto');

//for salesman
exports.createCard = function(req,res){
  var userId = req.session.user._id;
  var lang = req.app.get('locale');

  
  res.render('salesman-newcard',{
    locale:config[lang]
  })
}

exports.managecards = function(req,res){
  var userId = req.session.user._id;
  var lang = req.app.get('locale');
  var now = new Date();
  var aWeekAgo = (new Date()).setDate(now.getDate()-7);
  WarrantyCard.find({createTime:{$gte:aWeekAgo}},function(err,cards){
    console.log(cards);
    res.render('salesman-managecards',{
      locale:config[lang],
      recent_cards:cards
    })
  })
  
}

exports.statistics = function(req,res){
  var lang = req.app.get('locale');
  res.render('salesman-statistics',{
    locale:config[lang]
  })
}

exports.search = function(req,res){
  var lang = req.app.get('locale');
  var keyword = req.param("keyword");
  var field = req.param("field");
  var cas = when.defer();
  var aps = when.defer();
  var uss = when.defer();
  var $or1 =[{
        note:new RegExp(keyword, 'i')
      }]
  var $or2 = [
      {
        name:new RegExp(keyword, 'i')
      },
      {
        SN:new RegExp(keyword, 'i')
      },
      {
        KY:new RegExp(keyword, 'i')
      }
    ]
  var $or3 = [
      {
        name:new RegExp(keyword, 'i')
      },
      {
        address:new RegExp(keyword, 'i')
      },
      {
        email:new RegExp(keyword, 'i')
      },
      {
        address:new RegExp(keyword, 'i')
      },
      {
        telephone:new RegExp(keyword, 'i')
      }
    ]
  if (keyword.match(/^[0-9a-fA-F]{24}$/)) {
    $or1.push({_id:new ObjectId(keyword)});
    $or2.push({_id:new ObjectId(keyword)});
    $or3.push({_id:new ObjectId(keyword)});
  } 

  switch(field){
    case 'warrantycard':{
      WarrantyCard.find({$or:$or1

        },function(err,cards){
          if(err){
            cas.reject(err);
          }else{
            console.log('[find][cards][cards:]');
            console.log(util.inspect(cards));
            cas.resolve(cards);
          }
        })
      uss.resolve([]);
      aps.resolve([]);
      break;}
    case 'appliance':{
      Appliance.find({$or:$or2},function(err,appliances){
        if(err){
            aps.reject(err);
          }else{
            console.log(util.inspect(appliances));
            aps.resolve(appliances);
          }

        })
      uss.resolve([]);
      cas.resolve([]);
      break;}
    case 'customer':{
      User.find({$or:$or3},function(err,users){
            if(err){
              uss.reject(err);
            }else{
              console.log(util.inspect(users));
              uss.resolve(users)
            }
        })
      cas.resolve([]);
      aps.resolve([]);
      break;}
    case 'all':{
      WarrantyCard.find({$or:$or1

        },function(err,cards){
          if(err){
            cas.reject(err);
          }else{
            console.log('[find][cards][cards:]');
            console.log(util.inspect(cards));
            cas.resolve(cards);
          }
        })
      Appliance.find({$or:$or2},function(err,appliances){
        if(err){
            aps.reject(err);
          }else{
            console.log(util.inspect(appliances));
            aps.resolve(appliances);
          }

        })
       User.find({$or:$or3},function(err,users){
            if(err){
              uss.reject(err);
            }else{
              console.log(util.inspect(users));
              uss.resolve(users)
            }
        })
       break;
    }
  }
  

 
  
 
  when.all([cas.promise,aps.promise,uss.promise]).then(function(values){
    res.render('search-results',{
       locale:config[lang],
       results:{
        warrantycards:values[0],
        appliances:values[1],
        users:values[2]
       },
       field:field,
       keyword:keyword,
       md5:function(str){return crypto.createHash('md5').update(str).digest('hex')}

    })
  })
  console.log('keyword '+keyword);
  console.log('field '+field);
  
}

