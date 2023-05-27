
const chats = [];

const socketController = (socket, io) => {
  chats.push(socket.id);
  io.emit("usuarios-activos", chats);

  console.log("Cliente Conectado", socket.id);

  socket.on("disconnect", () => {
    chats.splice(chats.indexOf(socket.id), 1);
    console.log("Cliente Desconectado", socket.id);
  });

  socket.on("mensaje-de-cliente", (payload, callback) => {
    callback("TU mensaje fue recibido!!");
    payload.from = "desde el server";
    socket.broadcast.emit("mensaje-de-server", payload);
  });

  socket.on("enviar-mensaje", ({ to, from, mensaje }) => {
    if (to) socket.to(to).emit("recibir-mensaje", { to, from, mensaje });
    else io.emit("recibir-mensaje", { from, mensaje });
  });
};

module.exports = { socketController };