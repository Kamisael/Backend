const express = require('express');
const Task = require('../models/Task');

async function crearTask (req, res = express.request) {
    const task = new Task(req.body);

    try {
        task.user = req.uid;
        const saved = await task.save();

        // Retorna el Task Creado
        res.json({
            ok: true,
            task: saved
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        });
    }
}

async function listarTask (req, res = express.request) {
    const tasks = await Task.find().populate('user', 'name');

    try {
        res.status(200).json({
            ok: true,
            tasks
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Error'
        });
    }
}

function actualizarTask (req, res = express.request) {
}
function eliminarTask (req, res = express.request) {
}

module.exports = {crearTask, listarTask, actualizarTask, eliminarTask};