const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;
const conn_limit = 1000;
const room_limit = 10;

io.on("connection", (socket) => {
  socket.on("registro", (id) => {
    /* Verifica se o registro é válido */
    if (conn_limit > io.sockets.adapter.sids.size) {
      socket.emit("registro_aceito");
    } else {
      socket.emit("registro_negado");
    }
  });

  socket.on("entrar-na-sala", (sala) => {
    socket.join(sala);
    if (io.sockets.adapter.rooms.get(sala).size > room_limit) {
      socket.leave(sala);
    } else {
      io.to(sala).emit(
        "jogadores",
        Array.from(io.sockets.adapter.rooms.get(sala))
      );
    }
  });

  socket.on('offer', ({ from, to, description }) => {
    io.to(to).emit("offer", from, to, description);
  });

  socket.on('answer', ({ from, to, description }) => {
    socket.to(to).emit('answer', { from, to, description });
    });

    socket.on('candidate', ({ from, to, candidate }) => {
      socket.to(to).emit('candidate', { from, to, candidate })
    });

  socket.on("disconnecting", () => {
    Array.from(socket.rooms)
      .filter((sala) => sala !== socket.id)
      .forEach((sala) => {
        io.to(sala).emit(
          "jogadores",
          Array.from(io.sockets.adapter.rooms.get(sala)).filter(
            (sid) => sid !== socket.id
          )
        );
      });
  });
});

app.use(express.static("./"));
server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));