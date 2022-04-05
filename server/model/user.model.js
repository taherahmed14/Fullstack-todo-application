const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todo: [
        {
            task: { type: String },
            current: { type: String },
            expiry: [{ type: String }],
            status: { type: Boolean },
        }
    ]
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("User", User);