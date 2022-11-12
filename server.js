// enviroment variables
require("dotenv").config();

// modules require
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


// connect to db
mongoose.connect(process.env.DBURL, (err) => {
    console.log('mongodb connect', err);
})

var Message = mongoose.model('Message', { name: String, message: String})

io.on('connection', () =>{
    console.log('a user is connected')
   })

// server start
var server = http.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT);
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

