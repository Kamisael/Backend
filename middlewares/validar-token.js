const { response } = require('express');
const jwt = require('jsonwebtoken');

function validarJWT (req, res = response, next) {

    // Sacar el Token
    const token = req.header('x-token');
    // Sin Token
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Token No Encontrado'
        });
    }

    try {
        // Verificar el Token
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
    } catch (error) {
        // Token Invalido
        return res.status(401).json({
            ok: false,
            msg: 'Token Invalido'
        });
    }

    // Seguir el Middleware
    next();
}

module.exports = {validarJWT};