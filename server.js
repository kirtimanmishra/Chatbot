var app = require('express')();
var http = require('http').Server(app);
var cors = require('cors');

app.use(cors());

app.get('/', function(req, res){
	console.log(req.query.m);
	res.send('You sent: '+ req.query.m);
});

http.listen(5000, function(){
	console.log('listening on port 5000');
});
