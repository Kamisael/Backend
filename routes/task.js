const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-token');
const { listarTask, crearTask, actualizarTask, eliminarTask } = require('../controllers/task');

router.use(validarJWT);
// CRUD de listas
router.get('/', listarTask);
router.post('/', crearTask);
router.put('/:id', actualizarTask);
router.delete('/:id', eliminarTask);

// Exportar Rutas
module.exports = router;