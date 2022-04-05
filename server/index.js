const express = require("express");
const app = express();
const connect = require("./config/db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRegister = require("./controller/register.cont");
const userLogin = require("./controller/login.cont");

app.use("/register", userRegister);
app.use("/login", userLogin);

app.listen(4200, async () => {
    await connect();
    console.log("Listening on port 4200");
});

