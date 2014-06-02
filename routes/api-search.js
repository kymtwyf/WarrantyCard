var ServiceRecord = require('../models/servicerecord');
var User = require('../models/user');
var WarrantyCard = require('../models/warrantycard');
var Appliance = require('../models/appliance');
var SalesRecord = require('../models/salesrecord');
var ServiceRecord = require('../models/servicerecord');
var config = require('../config/config.json');
var ERROR_HELPER = require('./api-helper').handleError;


exports.search = function(req,res){
  var content = req.body.content;
  
}