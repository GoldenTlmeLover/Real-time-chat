const HOST = "localhost";
const PORT = "8080";

function addMessages(message) {
  let inputName = document.getElementById("name").value;

  let div = document.createElement("div");
  let h4 = document.createElement("h4");
  let p = document.createElement("p");
  let span = document.createElement("span");

  // DIFERENT COLOR FOR SENDER
  if (message.name == inputName) {
    div.classList.add(
      "bg-blue-600",
      "my-2",
      "h-auto",
      "w-auto",
      "p-2",
      "rounded-2xl"
    );
    h4.classList.add("m-1", "text-red-800", "font-bold");
  } else {
    div.classList.add(
      "bg-gray-600",
      "my-2",
      "h-auto",
      "w-auto",
      "p-2",
      "rounded-2xl"
    );
    h4.classList.add("m-1", "text-red-800", "font-bold");
  }

  p.classList.add("m-1", "text-slate-200");
  span.classList.add("text-end", "justify-end", "ml-auto", "mr-0", "m-1");

  h4.innerHTML = message.name;
  p.innerHTML = message.message;
  span.innerHTML = message.time;

  div.appendChild(h4);
  div.appendChild(p);
  div.appendChild(span);

  document.getElementById("messages").appendChild(div);
  getBottom();
}

function getMessages() {
  $.get(`http://${HOST}:${PORT}/messages`, (data) => {
    clearMessages();
    data.forEach(addMessages);

    getBottom();
  });
}
function sendMessage(message) {
  $.post(`http://${HOST}:${PORT}/messages`, message);
  getBottom();
}

function clearMessages() {
  $("#messages").html("");
}

function getBottom() {
  $("#scroll").scrollTop($("#scroll")[0].scrollHeight);
}
