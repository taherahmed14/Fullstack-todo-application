const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.post("", async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user) {
        return res.json({ status: "ok" });
    }
    else {
        return res.json({ status: "error" });
    }
});

module.exports = router;