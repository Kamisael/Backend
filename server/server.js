const express = require('express');
const { dbConnection } = require('../database/config');
require('dotenv').config();
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Configuración de Express
    this.server = require('http').createServer(this.app);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.io = require('socket.io')(this.server, {
      cors: {origin: "https://6476507e753658057773416c--fastidious-unicorn-d28328.netlify.app"}
  });
    // Conexión a la base de datos
    this.connectToDB();


    // Configuración de rutas
    this.setRoutes();

    // Configuración de WebSockets
    this.sockets();
  }

  async connectToDB() {
    await dbConnection();
  } 

  setRoutes() {
    this.app.use('/api/auth', require('../routes/auth'));
    // Agrega aquí tus rutas adicionales
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port);
    });
  }
}

module.exports = Server;