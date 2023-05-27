const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


async function crearUsuario(req, res = express.req) {
    try {
        const { email, password } = req.body;
        // Verifica que el Usuario no exista
        let usuario = await Usuario.findOne({email: email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El Usuario con ese correo ya existe'
            });
        }

        // Crea el usuario si no existe
        usuario = new Usuario(req.body);
        // Encripta la Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // Guarda el Usuario
        await usuario.save();
        // Generar Token de JWT
        let token = await(generarJWT(usuario.id, usuario.name));

  
        // Regresa el Usuario creado
        return res.status(200).json({
            ok: true,
            token,
            usuario
        });
    } catch (error) {
        // Ocurrio un Error
        console.log(error);
        return res.status(500).json({
            ok: false,
            error
        });
    }
}

async function loginUsuario(req, res = express.req) {
    try {
        const { email, password } = req.body;
        // Verifica que el Usuario Exista
        let usuario = await Usuario.findOne({email: email});
        if (usuario && bcrypt.compareSync(password, usuario.password)) {
            // Generar Token de JWT
            let token = await(generarJWT(usuario.id, usuario.name));
            // Regresa el Usuario creado
            return res.status(200).json({
                ok: true,
                token,
                usuario
            });

        }

        // Usuario o contraseña invalido
        res.status(400).json({
            ok: false,
            msg: 'El usuario o contraseña es invalido'
        });
    } catch (error) {
        // Ocurrio un Error
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    }
}

async function revalidarToken(req, res = express.req) {
    const {uid, name} = req;
    const token = await generarJWT(uid, name);
    
    res.json({
        ok: true,
        token
    });
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
};