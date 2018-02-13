let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
userconnect = new Array();

const port = process.env.PORT || 3000;

io.on('connection', function (socket) {
  socket.on('add user', function (user) {
    encontrado = userconnect.indexOf(user[0]);
    if (user[0] === null) {
      socket.emit('conectar', "Error! You must write a nickname");
    } else if (encontrado >= 0) {
      socket.emit('conectar', "Error! The nickname '" + user[0] + "' already exists");
    } else {
      userconnect.push(user[0]);
      socket.emit('conectar', user[0] + " se ha conectado");
    }
  });
});

server.listen(port, function () {
  console.log(`started on port: ${port}`);
});


