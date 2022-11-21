let mongoose = require('mongoose');
test()

async function test (){
let time = getTime() 
console.log('CONNECT TO MONGODB')

mongoose.connect('mongodb+srv://ezops_db:lH0RxyM7rA9U37dD@ezopschatdb.qqh0jxx.mongodb.net/test', (err) => {
    console.log('mongodb connect', err);
})

let Message = mongoose.model('Message', { name: String, message: String, time: String})
let message = new Message({name:'test', message:'test', time:`${time}`});

console.log('SAVING MESSAGE TEST ON MONGODB')
await message.save()

console.log('CLOSING CONNECTION WITH MONGODB')
mongoose.connection.close()

return;
}

function getTime(){
    var now = new Date();
    var current = now.getHours() + ':' + now.getMinutes();
    return current;
}