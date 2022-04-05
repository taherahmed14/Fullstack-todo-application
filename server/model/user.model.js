const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todo: { type: String }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("User", User);