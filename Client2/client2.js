var mySocket =io.connect("http://localhost:8001");

var nameInputContainer = document.getElementById("name_InputContainer");
var messageform= document.getElementById("send_container");
const chatContainer = document.getElementById("chat_Container");
var messageinput = document.getElementById("message_input");
var messagecontainer = document.getElementById("message_container");
var sendMessage = document.getElementById("send_button");
var Header= document.getElementById("Header");

var name;

function submitName() {
    const nameInput = document.getElementById("nameInput");
    name = nameInput.value.trim();

if(name){
    nameInputContainer.style.display = "none";
    chatContainer.style.display = "block";
    Header.style.display = "block";
    appendMessage(name + " has joined!");
    mySocket.emit("new_user", name )
    }
}


function appendMessage(message, isUser = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", isUser ? "user-message" : "other-message");
    messageElement.textContent = message;
    messagecontainer.appendChild(messageElement);
}

function appendSystemMessage(message) {
    appendMessage(message, false);
}

// function appendMessage(message){

//     messagecontainer.innerHTML += `<div>${message}</div>`;

// }

messageform.addEventListener("submit",function(e){
    e.preventDefault();
    var message= messageinput.value;
    if(message){
        mySocket.emit("new_message",message);
        appendMessage(message +":YOU" ,true)
    }
})

mySocket.on("new_user",function(message){
    appendSystemMessage(message);
})


mySocket.on("new_message",function(message){
    appendMessage(message.username +": "+ message.message,false)
})
// mySocket.emit("send_chat_message", "hi how are you server");

// mySocket.on("send_chat_message_server",function(message){
//     console.log(message);
// })