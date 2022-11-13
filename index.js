function addMessages(message){
$("#messages").append(`
  <h4> ${message.name} </h4>
  <p>  ${message.message} </p>`)
}

function getMessages(){
$.get(`http://15.229.71.241:8080/messages`, (data) => {
data.forEach(addMessages);
})
}
function sendMessage(message){
$.post(`http://15.229.71.241:8080/messages`, message)
}

function clearMessages(){
$('#messages').html("");
}
