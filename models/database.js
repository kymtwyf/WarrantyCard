var mongoose = require('mongoose');
// mongoose.connect('mongodb://192.168.10.212:30000/WarrantyCard');
// mongoose.connect('mongodb://103.6.221.212:30000/WarrantyCard');
mongoose.connect('mongodb://localhost/BS');

exports.mongoose = mongoose;
exports.Schema = mongoose.Schema;
exports.ObjectId = mongoose.Schema.Types.ObjectId;
exports.Mixed = mongoose.Schema.Types.Mixed;
exports.Types = mongoose.Types;

exports.model = function (name, schema) {
  return mongoose.model(name, schema);
};

