let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
userconnect = [];
usuarios_en_juego = [];
tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
puntUsuarios = [0, 0];
turno = 0;
gana = "";
conjMensajeP = [];
conjMensajeO = [];

const port = process.env.PORT || 3000;

io.on('connection', function (socket) {

  socket.on('add user', function (user) {
    encontrado = userconnect.indexOf(user[0]);
    if (userconnect.length === 2) {
      socket.emit('conectar', "Error! At this moment there are already 2 users connected, try it later")
    } else if (user[0] === null) {
      socket.emit('conectar', "Error! You must write a nickname");
    } else if (encontrado >= 0) {
      socket.emit('conectar', "Error! The nickname '" + user[0] + "' already exists");
    } else {
      userconnect.push(user[0]);
      socket.imagen = user[1];
      socket.usuario = user[0];
      socket.emit('conectar', user[0] + " se ha conectado");
    }
  });
  socket.on('iniciar juego', function () {
    if (usuarios_en_juego.length === 2) {
      io.emit('preparar juego', true)
    } else {
      io.emit('preparar juego', false)
    }
  });
  socket.on('sumar jugador', function () {
    usuarios_en_juego.push(socket.usuario);
  });

  socket.on('quitar jugador', function () {
    for (let x in usuarios_en_juego) {
      if (socket.usuario === usuarios_en_juego[x]) {
        usuarios_en_juego.splice(x, 1);
        socket.broadcast.emit('userdesconectado');
        puntUsuarios = [0, 0];
      }
    }
  });

  socket.on('pedir usuarios', function () {
    for (let x in usuarios_en_juego) {
      if (usuarios_en_juego[x] !== socket.usuario) {
        socket.emit('recibir usuario', usuarios_en_juego[x])
      }
    }
  });
  socket.on('pedir puntosP', function () {
    if (socket.usuario === usuarios_en_juego[1]) {
      socket.emit('devuelvo puntosP', puntUsuarios[1])
    } else if (socket.usuario === usuarios_en_juego[0]) {
      socket.emit('devuelvo puntosP', puntUsuarios[0])
    }
  });
  socket.on('pedir puntosC', function () {
    if (socket.usuario !== usuarios_en_juego[1]) {
      socket.emit('devuelvo puntosC', puntUsuarios[1])
    } else if (socket.usuario !== usuarios_en_juego[0]) {
      socket.emit('devuelvo puntosC', puntUsuarios[0])
    }
  });
  socket.on('cambia casilla', function (posicion) {
    if (usuarios_en_juego[turno] === socket.usuario) {
      if (tablero[posicion] === 0) {
        posicionU = usuarios_en_juego.indexOf(socket.usuario);
        if (posicionU === 0) {
          tablero[posicion] = "x";
          io.emit('cambiar tablero', tablero);
          ganador();
          if (turno === 0) {
            turno = 1;
          } else if (turno === 1) {
            turno = 0;
          }
        }
        if (posicionU === 1) {
          tablero[posicion] = "o";
          io.emit('cambiar tablero', tablero);
          ganador();
          if (turno === 0) {
            turno = 1;
          } else if (turno === 1) {
            turno = 0;
          }
        }
        socket.emit('casilla vacia', false);
      } else {
        socket.emit('casilla vacia', true);
      }
      io.emit('turno', false);
    } else if (usuarios_en_juego[turno] !== socket.usuario) {
      socket.emit('turno', true);
    }
  });

  function ganador() {
    if (((tablero[0] === tablero[1] && tablero[1] === tablero[2]) ||
        (tablero[0] === tablero[4] && tablero[4] === tablero[8]) ||
        (tablero[0] === tablero[3] && tablero[3] === tablero[6])) &&
      tablero[0] !== 0) {
      if (tablero[0] === 'x') {
        comprobarG(0);
      }
      if (tablero[0] === 'o') {
        comprobarG(1);
      }
    }
    if (((tablero[8] === tablero[7] && tablero[7] === tablero[6]) ||
        (tablero[8] === tablero[5] && tablero[5] === tablero[2])) &&
      tablero[0] !== 0) {
      if (tablero[8] === 'x') {
        comprobarG(0);
      }
      if (tablero[8] === 'o') {
        comprobarG(1);
      }
    }
    if (((tablero[4] === tablero[3] && tablero[3] === tablero[5]) ||
        (tablero[4] === tablero[1] && tablero[1] === tablero[7]) ||
        (tablero[4] === tablero[2] && tablero[2] === tablero[6])) &&
      tablero[0] !== 0) {
      if (tablero[4] === 'x') {
        comprobarG(0);
      }
      if (tablero[4] === 'o') {
        comprobarG(1);
      }
    }
    if (tablero[0] !== 0 && tablero[1] !== 0 && tablero[2] !== 0 && tablero[3] !== 0 && tablero[4] !== 0 && tablero[5] !== 0 && tablero[6] !== 0 && tablero[7] !== 0 && tablero[8] !== 0 && tablero[9] !== 0) {
      tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      io.emit('cambiar tablero', tablero);
      io.emit('empate', "It was draw");
    }
  }

  function comprobarG(posicionU) {
    puntUsuarios[posicionU]++;
    tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    io.emit('cambiar tablero', tablero);
    io.emit('ganador anterior', usuarios_en_juego[posicionU]);
    if (puntUsuarios[posicionU] === 3) {
      gana = usuarios_en_juego[posicionU];
      socket.emit('ganador', usuarios_en_juego[posicionU])
    }
  }

  socket.on('disconnect', function () {
    for (let x in userconnect) {
      if (socket.usuario === userconnect[x]) {
        userconnect.splice(x, 1);
      }
    }
    for (let x in usuarios_en_juego) {
      if (socket.usuario === usuarios_en_juego[x]) {
        usuarios_en_juego.splice(x, 1);
        tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        io.emit('cambiar tablero', tablero);
        socket.broadcast.emit('userdesconectado');
        puntUsuarios = [0, 0];
        io.emit('usuario desconectado', socket.usuario)
      }
    }
  });
  socket.on('enviar', function (texto) {
    if (texto === null) {
      socket.emit('mensaje vacio', true)
    } else {
      d = new Date();
      h = d.getHours();
      m = d.getMinutes();
      if (m < 10) {
        m = "0" + m;
      }
      if (h < 10) {
        h = "0" + h;
      }
      hora = h + ":" + m;
      conjMensajeP = [socket.usuario, socket.imagen, texto, hora, false];
      conjMensajeO = [socket.usuario, socket.imagen, texto, hora, true];
      socket.emit('mensajeP', conjMensajeP);
      socket.emit('mensaje vacio', false);
      socket.broadcast.emit('mensajeO', conjMensajeO);
    }
  });


});

server.listen(port, function () {
  console.log(`started on port: ${port}`);
});
