var database = require('./database');

var schema = new database.Schema({
  applianceId:database.ObjectId,
  soldPrice:Number,
  // discount:{type:Number,default:1.0},
  soldTime:{type:Date, default: Date.now},// the Date of selling
  seller:database.ObjectId,

})

// schema.pre('save',function(next){
//   // if(!this.soldPrice){
//   //   this.soldPrice
//   // }
// })
var SalesRecord = database.model('SalesRecord',schema);

module.exports = SalesRecord;
