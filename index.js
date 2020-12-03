const express = require('express');
const app = express();
const database = require('./manager/database');
const users = require('./routes/users');
const brands = require('./routes/brands');

const conn = new database({
    host: "localhost",
    user: "root",
    password: "",
    database: "carrental"
});

global.db = conn;

app.use(express.json());
app.use("/api/v1/users", users);
app.use("/api/v1/brands", brands);

app.listen(3000, () => console.log("The server is running and listening on port 3000."));