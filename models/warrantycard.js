var database = require('./database');

var schema = new database.Schema({
  //要加保修记录
  SN:String,
  KY:String,
  seller:database.ObjectId,//reference to seller._id
  shop:database.ObjectId,//reference to shop._id
  customer:database.ObjectId,
  invoicePic:[],//Uri for invoice path
  note:String,
  message:[],//

  //detailed information

  creator:database.ObjectId,//who created it
  createTime:{ type: Date, default: Date.now},//time created
  expireTime:{ type: Date},
  status:{type: String, default: 'ACTIVE'},//ACTIVE,DELETED(PENDING)

})


var WarrantyCard = database.model('WarrantyCard',schema);

module.exports = WarrantyCard;