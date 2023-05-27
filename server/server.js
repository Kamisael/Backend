const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/config');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {origin: "http://localhost:3000"}
        });

        this.paths = {
            auth: '/api/auth'
           
        };

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();
        // WebSockets
        this.sockets();
    }

    async connectToDB() {
        await dbConnection();
    }

    addMiddlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    setRoutes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
;
    }

    sockets() {
        // Cuando se Conecta
        this.io.on('connection', 
            socket => socketController(socket, this.io));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor Corriendo en el Puerto', process.env.PORT);
        });
    }
}

module.exports = {Server};
