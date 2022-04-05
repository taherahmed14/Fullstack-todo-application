const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

router.post("", async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user) {
        const token = jwt.sign({
            username: user.username,
            email: user.email
        }, 'doodle');
        return res.json({ status: "ok", token, user: true });
    }
    else {
        return res.json({ status: "error" });
    }
});

module.exports = router;