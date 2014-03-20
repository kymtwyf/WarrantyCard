var responseTest = {
	name:"test",
	studentId:"102891"
}
module.exports = function(app){
	app.get('/',function(req,res){
		res.send('200',responseTest);
	})
}
