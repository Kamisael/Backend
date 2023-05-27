const mongoose = require('mongoose');

async function dbConnection () {
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            autoIndex: true
        });

        console.log("DB Online");
    } catch (error) {
        console.log("DB Error: " + error);
        throw new Error("Error a conectar en DB");
    }
}

module.exports = { dbConnection };