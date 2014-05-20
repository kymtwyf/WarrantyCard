var database = require('./database');
var when = require('when');
var util = require('util');
var schema = new database.Schema({
  warrantyId:database.ObjectId,
  openReason:String,//service open reason "consult/repair/return"
  message:[],
  isopen:{type:Boolean,default:true},
  rating:{ type: Number, min: 0, max: 5},
  closeTime:Date,
  closer:database.ObjectId,
  closeReason:String
})

// schema.statics.findByWarrantyId = function(warrantyId){
//   var ret = when.defer();
//   this.find({warrantyId:warrantyId},function(err,records){
//     if(err){
//       ret.reject();
//     }else{
//       ret.resolve(records);
//     }
//   })
//   return ret.promise;
// }
var saveCallBack = function(err,record){
  var ret = when.defer();
  if(err){
    ret.reject();
  }else{
    ret.resolve(record);
  }
  return ret.promise;
}
schema.methods.insertMessage = function(user,message){
  var ret = when.defer();
  var obj = {
    user:{
      _id:user._id,
      name:user.name,
      email:user.email
    },
    message:message,
    _id:new database.mongoose.Types.ObjectId()
  }
  console.log('insertiong')
  this.message.push(obj);
  this.save(function(err,record){
    ret.resolve(saveCallBack(err,record));
  });

  return ret.promise;
}

schema.methods.setRating = function(number){
  var ret = when.defer();
  if(number < 0 || number > 5){
    ret.reject("error raiting number "+number);
  }else{
    this.raiting = number;
    this.save(function(err,record){
      ret.resolve(saveCallBack(err,record));
    });
  }
  return ret.promise;
}

schema.methods.closeRecord = function(reason){
  var ret = when.defer();
  this.isopen = false;
  this.closeReason = reason;
  this.closeTime = new Date();
  this.save(function(err,record){
    ret.resolve(saveCallBack(err,record));
  });  
  return ret.promise;
}

schema.methods.reopenRedord = function(){
  var ret = when.defer();
  this.isopen = true;
  this.save(function(err,record){
    ret.resolve(saveCallBack(err,record));
  });  
  return ret.promise;
}
var ServiceRecord = database.model('ServiceRecord',schema);

module.exports = ServiceRecord;

// ServiceRecord.findOne({warrantyId:"5357f602371e1a3c2274cd1b"},function(Err,obj){
//   if(Err){
//     console.log('err');
//   }else{
//       console.log(JSON.stringify(obj.message));
//       obj.closeRecord(function(){
//         consol.log("closed");
//       });
//     // obj.insertMessage({
//     //   userName:"kevian3",
//     //   email:"kevian3wsg.woo@gmail.com"
//     // },{
//     //   messageTitle:"2hasdfgllo",
//     //   messageContent:"2Thidgs is a test message please ignore"
//     // }).then(function(){
//     //   console.log(JSON.stringify(obj.message));

//     // })
//     //   console.log(util.inspect("1"+obj.message));

//   }
// })







