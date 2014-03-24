var responseTest = {
	name:"test",
	studentId:"102891"
}
var api = require('./api');
module.exports = function(app){
	app.get('/',function(req,res){
		res.writeHead('200',{'Content-Type':'application/json'});
		res.end(JSON.stringify(responseTest));
	});
	app.post('/register',api.Customer.register);
}
