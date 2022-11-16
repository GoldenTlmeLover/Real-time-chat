// enviroment variables
require("dotenv").config();

const enviroment = {
    host : 'load-1550327946.sa-east-1.elb.amazonaws.com',
    port : '8080',
    dbUrl : 'mongodb+srv://ezops_db:lH0RxyM7rA9U37dD@ezopschatdb.qqh0jxx.mongodb.net/test',
}

// modules require
var express = require('express');
var app = express();
var cors = require('cors')

var http = require('http').Server(app);
var io = require('socket.io')(http, {
    cors: {
        origin: `*`,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: false
    },
    allowEIO3: true
});


var bodyParser = require('body-parser');

var mongoose = require('mongoose');



app.use(cors());

app.use(express.static(__dirname))

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// connect to db
console.log(enviroment.dbUrl);
mongoose.connect(enviroment.dbUrl, (err) => {
    console.log('mongodb connect', err);
})

var Message = mongoose.model('Message', { name: String, message: String})

io.on('connection', () =>{
    console.log('a user is connected')
   })

// server start
var server = http.listen(enviroment.port, () => {
    console.log('server is running on port', enviroment.port);
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

