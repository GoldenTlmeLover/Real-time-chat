// enviroment letiables
require("dotenv").config();

const enviroment = {
    host : 'localhost',
    port : '8080',
    dbUrl : 'mongodb+srv://ezops_db:lH0RxyM7rA9U37dD@ezopschatdb.qqh0jxx.mongodb.net/messages',
}

// modules require
let express = require('express');
let app = express();
// let cors = require('cors')

let http = require('http').Server(app);

let io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user is connected');
})
//      {
//     cors: {
//         origin: `*`,
//         methods: ["GET", "POST"],
//         transports: ['websocket', 'polling'],
//         credentials: false
//     },
//     allowEIO3: true
// });


let bodyParser = require('body-parser');

let mongoose = require('mongoose');



// app.use(cors());

app.use(express.static(__dirname))

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// connect to db
console.log(enviroment.dbUrl);
mongoose.connect(enviroment.dbUrl, (err) => {
    console.log('mongodb connect', err);
})

let Message = mongoose.model('Message', { name: String, message: String, time: String})



// server start
let server = http.listen(enviroment.port, () => {
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
    let message = new Message(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

