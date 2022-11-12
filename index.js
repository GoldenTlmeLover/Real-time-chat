$(() => {
    var socket = io();
    socket.on('message', addMessages);
    
    $("#send").click(async()=>{
        clearMessages();
        await sendMessage({
            name: $("#name").val(), 
            message:$("#message").val()});
            getMessages();
    })
})
function addMessages(message){
$("#messages").append(`
  <h4> ${message.name} </h4>
  <p>  ${message.message} </p>`)
}
function getMessages(){
$.get('http://localhost:8080/messages', (data) => {
data.forEach(addMessages);
})
}
function sendMessage(message){
$.post('http://localhost:8080/messages', message)
}

function clearMessages(){
$('#messages').html("");
}
