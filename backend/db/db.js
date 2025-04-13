const mongoose = require('mongoose');
require('dotenv').config()

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to DB');
    } catch (err) {
        console.error('Error connecting to DB:', err.message);
    }
}

module.exports = connectToDb;