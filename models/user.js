var database = require('./database');
var crypto = require('crypto');
var util = require('util');

var schema = new database.Schema({
  name: {type: String},
  password_md5: String,
  email: {type: String, index: {unique: true}},
  address:String,
  telephone:String,
  status:{ type: String, default: 'ACTIVE'},//ACTIVE, DELETED
  createTime:{type: Date, default: Date.now},
  updateTime:{type: Date, default: Date.now },
  role:{ type: String, default : 'customer'}
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

schema.pre('save',function(next){
  this.updateTime = new Date;
  next();
})
var User = database.model('User', schema);

module.exports = User;

