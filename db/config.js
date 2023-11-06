const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const dbUrl = process.env.dbURL;

async function connect() {
    const db = await mongoose.connect(dbUrl);
    console.log("Database connected successfully.");
    return db;
}

module.exports = connect;