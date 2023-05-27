const jwt = require('jsonwebtoken');

function generarJWT (uid, name) {
    return new Promise( (resolve, reject) => {
        const payload = {uid: uid, name: name};
        // Generar el Token JWT
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }

            resolve(token);
        });
    });
}

module.exports = { generarJWT };