var Appliance = require('./appliance');
var User = require('./user');
var WarrantyCard = require('./warrantycard');

var when = require('when');

var appliance = when.defer();
var customer = when.defer();
var salesman = when.defer();


new Appliance({
  name:"PHILIPS Monitor",
  SN:"VPCEA28EC",
  KY:"2345E",
  detailPath:"http://detail.zol.com.cn/lcd/index356359.shtml",

  price:"1200",

  status:"SOLD"
}).save(function(err,result){
  if(!err){
    appliance.resolve(result);
  }else{
    console.log('error when saving the appliance'+err);
  }
});

new User({
  name:"wuyongfeng",
  password:"wuyongfeng",
  email:Math.random()+"@gmail.com",
  address:"Shanghai, China",
  telephone:"18897185"
}).save(function(err,user){
  if(!err){
    customer.resolve(user);
  }else{
    console.log('error when creating the user '+err);
  }
})

new User({
  name:"salesman",
  password:"wuyongfeng",
  email:Math.random()+"@gmail.com",
  address:"Shanghai, China",
  telephone:"1318897185",
  role:"salesman"
}).save(function(err,user){
  if(!err){
    salesman.resolve(user);
  }else{
    console.log('error when creating the salesman '+err);
  }
})


when.all([appliance.promise,customer.promise,salesman.promise])
    .then(function(values){
          new WarrantyCard({
            SN:values[0].SN,
            KY:values[0].KY,
            appliance:values[0]._id,
            customer:values[1]._id,
            seller:values[2]._id,
            note:"aiaiaiai",
            creator:values[2]._id
          }).save(function(err,card){
            if(err){
              console.log("errorn when craeting warrantycard "+err);
            }else{
              console.log("DONE");

              process.exit(0);
            }
          })

})




