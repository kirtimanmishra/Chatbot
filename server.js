let app = require('express')();
let http = require('http').Server(app);
let cors = require('cors');
let cookieParser = require('cookie-parser');
const uuidv1 = require('uuid/v1');

app.use(cors());
app.use(cookieParser());

app.get('/', function(req, res){
    if(req.query.getid){
        let new_user = uuidv1();
        res.send(new_user);
        console.log("new user: "+new_user);
    } else {
        console.log(req.query);
        res.send('You sent: '+ req.query.m + "\nUID: "+req.query.id);
    }
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
