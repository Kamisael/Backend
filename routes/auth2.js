const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// Ruta para enviar un mensaje de chat
router.post('/chat', [
  check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
  validarCampos
], (req, res) => {
  const { mensaje } = req.body;
  // Realizar acciones necesarias con el mensaje recibido
  console.log('Mensaje recibido:', mensaje);
  res.status(200).json({ mensaje: 'Mensaje recibido correctamente' });
});

module.exports = router;
