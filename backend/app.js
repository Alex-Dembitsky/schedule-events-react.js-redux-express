const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("../backend/config/index");
const routerLogin = require("../backend/routes/login");
const routerEvents = require("../backend/routes/events");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// mongodb connection
mongoose.connect(config.database);

mongoose.connection.on("connected", function () {
    console.log("Mongoose connection open to " + config.database);
});

mongoose.connection.on("error",function (err) {
    console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
    console.log("Mongoose connection disconnected");
});

// allow cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes
app.use("/login", routerLogin);
app.use("/events", routerEvents);


app.listen(config.port, () => console.log(`Server launched on port ${config.port}`));