var database = require('./database');
var crypto = require('crypto');
var when = require('when');
var util = require('util');

var allStatus = ["ACTIVE", "DELETED"]
var allRoles = ["customer","salesman"]
var schema = new database.Schema({
  name: {type: String},
  password_md5: String,
  email: {type: String, index: {unique: true}},
  address:String,
  telephone:String,
  status:{ type: String, default: allStatus},//ACTIVE, DELETED
  createTime:{type: Date, default: Date.now},
  updateTime:{type: Date, default: Date.now },
  role:{ type: String, default : allRoles}//customer salesman
});

schema.statics.md5 = function (str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

schema.virtual('password').set(function (password) {
  console.log(util.inspect(this));
  this.password_md5 = schema.statics.md5(password);
});

schema.statics.findOneByNamePassword = function (name, password) {
  var password_md5 = schema.statics.md5(password);
  return this.findOne({name: name, password_md5: password_md5});
}
schema.statics.findOneByEmailPassword = function (email, password) {
  var password_md5 = schema.statics.md5(password);
  return this.findOne({email: email, password_md5: password_md5});
}


var saveCallBack = function(err,user){
  var ret = when.defer();
  if(err){
    ret.reject();
  }else{
    ret.resolve(user);
  }
  return ret.promise;
}

schema.methods.delete = function(){
  var ret = when.defer();
  this.status = "DELETED";
  this.save(function(err,user){
    ret.resolve(saveCallBack(err,record));
  });

  return ret.promise;
}


schema.pre('save',function(next){
  this.updateTime = new Date;
  next();
})
var User = database.model('User', schema);

module.exports = User;



