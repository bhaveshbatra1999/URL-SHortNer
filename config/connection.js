const mongoose = require('mongoose');
var config = require('./config.json');

mongoose.connect(config.URI, {useUnifiedTopology: true, useNewUrlParser: true});

const connectDB = mongoose.connection;

connectDB.on("error", (error)=> console.log(error));
connectDB.once("open", ()=> console.log("Connected to Database Successfully"));

module.exports = connectDB;