const Message = require('../models/message');

const socketController = (socket, io) => {
  let chats = []; 

  chats.push(socket.id);
  io.emit("usuarios-activos", chats);

  console.log("Cliente Conectado", socket.id);

  socket.on("disconnect", () => {
    chats.splice(chats.indexOf(socket.id), 1);
    console.log("Cliente Desconectado", socket.id);
  });

  socket.on("mensaje-de-cliente", (payload, callback) => {
    callback("Tu mensaje fue recibido!!");
    payload.from = "desde el server";
    socket.broadcast.emit("mensaje-de-server", payload);

    // Guardar el mensaje en la base de datos
    try {
      const newMessage = new Message({
        from: payload.from,
        message: payload.message,
        timestamp: Date.now()
      });
      newMessage.save()
        .then(savedMessage => {
          console.log("Mensaje guardado en la base de datos:", savedMessage);
        })
        .catch(error => {
          console.log("Error al guardar el mensaje en la base de datos:", error);
        });
    } catch (error) {
      console.log("Error al guardar el mensaje en la base de datos:", error);
    }
  });

  socket.on("enviar-mensaje", ({ to, from, mensaje }) => {
    if (to) socket.to(to).emit("recibir-mensaje", { to, from, mensaje });
    else io.emit("recibir-mensaje", { from, mensaje });

    // Guardar el mensaje en la base de datos
    try {
      const newMessage = new Message({
        from,
        message: mensaje,
        timestamp: Date.now()
      });
      newMessage.save()
        .then(savedMessage => {
          console.log("Mensaje guardado en la base de datos:", savedMessage);
        })
        .catch(error => {
          console.log("Error al guardar el mensaje en la base de datos:", error);
        });
    } catch (error) {
      console.log("Error al guardar el mensaje en la base de datos:", error);
    }
  });
};

module.exports = { socketController };
