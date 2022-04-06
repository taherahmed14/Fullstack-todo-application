const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

router.get("", async(req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'doodle');
        const email = decoded.email;
        const user = await User.findOne({ email: email });
        console.log(user);
        //console.log(user.todo);

        return res.json({ status: "ok", todo: user.todo, user: user });
    }
    catch(e) {
        return res.json({ status: "Error" });
    }
});

router.post("", async(req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'doodle');
        const email = decoded.email;
        const user = await User.updateOne({ email: email }, { $set: { todo: req.body.todo } });

        return res.json({ status: "ok", todo: user.todo, user: user });
    }
    catch(e) {
        return res.json({ status: "Error" });
    }
});

module.exports = router;