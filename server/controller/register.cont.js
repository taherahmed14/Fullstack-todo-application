const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.post("", async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json({ status: "ok" });
    }
    catch(e) {
        res.json({ status: "error" });
    }
});

module.exports = router;