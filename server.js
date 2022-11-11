var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');

var mongoose = require('mongoose');


app.use(express.static(__dirname))

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// connect to DB
var dbUrl = 'mongodb+srv://ezops_db:rAkoIe5CVmmOtKzj@ezopschatdb.z0zzzxg.mongodb.net/ezopsChatDB';

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connect', err);
})

var Message = mongoose.model('Message', { name: String, message: String})

io.on('connection', () =>{
    console.log('a user is connected')
   })

// server start
var server = http.listen(8080, () => {
    console.log('server is running on port', server.address().port);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

// 
app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

