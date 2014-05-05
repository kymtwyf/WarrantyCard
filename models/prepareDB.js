var Appliance = require('./appliance');
var User = require('./user');
var WarrantyCard = require('./warrantycard');

var when = require('when');

var appliance = when.defer();
var customer = when.defer();
var salesman = when.defer();

new Appliance({
  name:"testn SONY Laptop",
  SN:"ABFADS",
  KY:"QET",
  detailPath:"http://detail.zol.com.cn/lcd/index356359.shtml",

  price:"6500",
  discount:"0.8",
  status:"SOLD"
}).save();
// new Appliance({
//   name:"SONY Laptop",
//   SN:"VAIOEP1DASG13",
//   KY:"VAIO E",
//   detailPath:"http://detail.zol.com.cn/lcd/index356359.shtml",

//   price:"6500",
//   discount:"0.8",
//   status:"SOLD"
// }).save();
 // new WarrantyCard({
 //            SN:"VAIOEP1DASG13",
 //            KY:"VAIO E",          
 //            appliance:"5357f602371e1a3c2274cd1b",
 //            customer:"5357cee2928a05e027323778",
 //            seller:"5357cee2928a05e027323779",
 //            note:"aiaiaiai",
 //            creator:"5357cee2928a05e027323779"
 //  }).save()

// new Appliance({
//   name:"PHILIPS Monitor",
//   SN:"VPCEA28EC",
//   KY:"2345E",
//   detailPath:"http://detail.zol.com.cn/lcd/index356359.shtml",

//   price:"1200",

//   status:"SOLD"
// }).save(function(err,result){
//   if(!err){
//     appliance.resolve(result);
//   }else{
//     console.log('error when saving the appliance'+err);
//   }
// });

// new User({
//   name:"wuyongfeng",
//   password:"wuyongfeng",
//   email:Math.random()+"@gmail.com",
//   address:"Shanghai, China",
//   telephone:"18897185"
// }).save(function(err,user){
//   if(!err){
//     customer.resolve(user);
//   }else{
//     console.log('error when creating the user '+err);
//   }
// })

// new User({
//   name:"salesman",
//   password:"wuyongfeng",
//   email:Math.random()+"@gmail.com",
//   address:"Shanghai, China",
//   telephone:"1318897185",
//   role:"salesman"
// }).save(function(err,user){
//   if(!err){
//     salesman.resolve(user);
//   }else{
//     console.log('error when creating the salesman '+err);
//   }
// })


// when.all([appliance.promise,customer.promise,salesman.promise])
//     .then(function(values){
          // new WarrantyCard({
          //   SN:values[0].SN,
          //   KY:values[0].KY,
          //   appliance:values[0]._id,
          //   customer:values[1]._id,
          //   seller:values[2]._id,
          //   note:"aiaiaiai",
          //   creator:values[2]._id
          // }).save(function(err,card){
          //   if(err){
          //     console.log("errorn when craeting warrantycard "+err);
          //   }else{
          //     console.log("DONE");

          //     process.exit(0);
          //   }
          // })

// })




