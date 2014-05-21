var database = require('./database');
var _ = require('underscore');
var allStatus = ["FORSALE","DELETED","SOLD"];
var schema = new database.Schema({
  name:String,
  SN:String,//Serial Number
  KY:String,// Model
  picPath:{type:String, default:"/images/appliances/default.jpg"},
  detailPath:String,
  
  price:Number,
  discount:{type:Number,default:1.0},

  status:{type:String, default:"FORSALE",enum:allStatus},//Status :FORSALE | DELETED | SOLD
  // soldTime:{type:Date, default: Date.now},// the Date of selling
  KPDs:[]//主关键部件的_id

})

schema.methods.setName = function(newName){
  this.name = newName;
  this.save();
}

schema.methods.setStatus = function(newStatus){
  if(_.indexOf(allStatus,newStatus) == -1){//not in the required range
    return;
  }else{
    this.status = newStatus;
    this.save();
  }
}

schema.methods.importKPD = function(KPD){
  this.KPDs.push(KPDS);
  this.save();
}

var Applicance = database.model('Applicance',schema);

module.exports = Applicance;