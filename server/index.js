let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
userconnect = [];
usuarios_en_juego = [];
tablero = [0, 0, 0, 0, 0, 0, 0, 0];

const port = process.env.PORT || 3000;

io.on('connection', function (socket) {


  socket.on('add user', function (user) {
    encontrado = userconnect.indexOf(user[0]);
    if(userconnect.length === 2){
      socket.emit('conectar', "Error! At this moment there are already 2 users connected, try it later")
    }else if (user[0] === null) {
      socket.emit('conectar', "Error! You must write a nickname");
    } else if (encontrado >= 0) {
      socket.emit('conectar', "Error! The nickname '" + user[0] + "' already exists");
    } else {
      userconnect.push(user[0]);
      socket.usuario = user[0];
      socket.emit('conectar', user[0] + " se ha conectado");
    }
  });
  socket.on('iniciar juego', function () {
    if(usuarios_en_juego.length === 2){
      io.emit('preparar juego', true)
    }else{
      io.emit('preparar juego', false)
    }
  });
  socket.on('sumar jugador', function(nada){
    usuarios_en_juego.push(socket.usuario);
    socket.emit('actualizar lista', usuarios_en_juego)
  });

  socket.on('escoge casilla', function (posicion) {

  })


});

server.listen(port, function () {
  console.log(`started on port: ${port}`);
});


