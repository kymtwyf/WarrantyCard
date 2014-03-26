var database = require('./database');

var schema = new database.Schema({
  SN:String,
  KY:String,
  seller:ObjectId,//reference to seller._id
  shop:ObjectId,//reference to shop._id
  customer:ObjectId,
  invoicePic:[],//Uri for invoice path
  note:String,
  message:[],//
  status:{type: String, default: 'ACTIVE'},//ACTIVE,DELETED(PENDING)

  //detailed information

  creator:ObjectId,//who created it
  createTime:{ type: Date, default: Date.now},//time created

})


var WarrantyCard = database.model('WarrantyCard',schema);

exports = WarrantyCard;