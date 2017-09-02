'use strict';

//make connection
let socket = io();

//getting element
let output = document.getElementById('output');
let name = document.getElementById('name');
let message = document.getElementById('message');
let sendBtn = document.getElementById('send');
let isTexting = document.getElementById('isTexting');

//emitting message
sendBtn.addEventListener('click', () => {
  socket.emit('chat', {
    name: (name.value != '' && name.value != ' ') ? name.value : 'unknown user',
    message: message.value
  });
  message.value = "";
})

//isTexting
message.addEventListener('keyup', () => {
  socket.emit('isTexting', {
    name: (name.value != '' && name.value != ' ') ? name.value : 'unknown user'
  })
})

//getting message
socket.on('message', (data) => {
  isTexting.innerHTML = "";
  output.innerHTML += "<p>" + data.name + " : " + data.message + "</p>";
});

socket.on('texting', (data) => {
  isTexting.innerHTML = "<p><em>" + data.name + " is texting...<em></P>"
})
