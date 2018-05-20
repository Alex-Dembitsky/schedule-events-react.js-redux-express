const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const config = require("../config/index");

router.post("/", (req, res) => {

    let newUser = new User({email: req.query.email, password: req.query.password});

    User.findOne({"email": req.query.email}, (err, user) => {
        if (err) {
            throw new Error(err);

        } else if (user === null) { // if user doesn't exist create him
            newUser.save((err, doc) => {
                if (err) throw new Error(err);
                else {
                    jwt.sign({email: req.query.email, password: req.query.password}, config.secret, {expiresIn: "30d"}, (err, token) => {
                        res.header("x-token", token);
                        res.sendStatus(200);
                    });
                }
            });

        } else if (user.password !== req.query.password) { // if user exist check password
            res.sendStatus(401);

        } else { // if user exist send token
            jwt.sign({email: req.query.email, password: req.query.password}, config.secret, {expiresIn: "30d"}, (err, token) => {
                res.header("x-token", token);
                res.sendStatus(200);
            });

        }
    });
});

module.exports = router;