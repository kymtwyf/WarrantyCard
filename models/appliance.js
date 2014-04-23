var database = require('./database');

var schema = new database.Schema({
  name:String,
  SN:String,//Serial Number
  KY:String,// Model
  picPath:{type:String, default:"/images/appliances/default.jpg"},
  detailPath:String,
  
  price:Number,
  discount:{type:Number,default:1.0},

  status:{type:String, default:"FORSALE"},//Status :FORSALE | DELETED | SOLD
  soldTime:{type:Date, default: Date.now},// the Date of selling
  KPDs:[]//主关键部件的_id

})


var Applicance = database.model('Applicance',schema);

module.exports = Applicance;