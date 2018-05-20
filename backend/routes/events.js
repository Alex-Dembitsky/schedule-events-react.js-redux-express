const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const config = require("../config/index");

router.get("/", verifyToken, (req, res) => {

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            User.findOne({"email": authData.email}, (err, user) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json(user.events);
                }
            });
        }
    });

});

router.put("/", verifyToken, (req, res) => {

    let event = req.body;

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            event.id = new mongoose.Types.ObjectId; // put id in an event

            User.update(
                { email: authData.email },
                { $push: { events: event } }, (err) => {if(err) console.log(err)}
            );
            res.json(event);
        }
    });

});

router.delete("/:id", verifyToken, (req, res) => {

    let eventId = req.params.id.slice(1);

    jwt.verify(req.token, config.secret, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            User.update(
                { email: authData.email },
                { $pull: { events: { id: eventId } } }, (err) => {if(err) console.log(err)}
            );
            res.json(eventId);
            res.sendStatus(200);
        }
    });

});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(" ");
        let bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;