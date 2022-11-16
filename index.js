// function addMessages(message){
// $("#messages").append(`x
//   <h4> ${message.name} </h4>
//   <p>  ${message.message} </p>`)
// }

const  HOST = "load-1550327946.sa-east-1.elb.amazonaws.com"
const PORT = "80"

function addMessages(message){
  var div = document.createElement('div');
  var h4 = document.createElement('h4');
  var p = document.createElement('p');


  div.classList.add('bg-gray-600', 'my-2', 'h-auto', 'w-auto', 'p-2', 'rounded-2xl');
  h4.classList.add('m-1', 'text-red-800');
  p.classList.add('m-1', 'text-slate-200');

  h4.innerHTML = message.name
  p.innerHTML = message.message

  div.appendChild(h4)
  div.appendChild(p)

  document.getElementById('messages').appendChild(div);
}

function getMessages(){
$.get(`http://${HOST}:${PORT}/messages`, (data) => {
data.forEach(addMessages);
})
}
function sendMessage(message){
$.post(`http://${HOST}:${PORT}/messages`, message)
}

function clearMessages(){
$('#messages').html("");
}
