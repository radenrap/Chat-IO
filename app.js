'use strict';

//export library
const express = require('express');
const app = express();
const socket = require('socket.io');

//Server setup
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Listening to : ${app.get('port')}`);
});

//App setup
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

//socket.io setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on('chat', (data) => {
    io.emit('message', data);
  })

  socket.on('isTexting', (data) => {
    socket.broadcast.emit('texting', data)
  })
});
