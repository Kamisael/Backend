const express = require('express');
const router2 = express.Router();
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-token');







// Ruta para Logear Usuario
router2.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({min: 6}),
        validarCampos
    ], 
    loginUsuario
);

// Ruta para Crear Usuario
router2.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
);

// Un solo middleware no requiere arreglo
router2.get('/renew', validarJWT, revalidarToken);
// Exportar Rutas
module.exports = router2;
