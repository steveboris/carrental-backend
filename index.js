const express = require('express');
const app = express();
const database = require('./manager/database');

const conn = new database({
    host: "localhost",
    user: "root",
    password: "",
    database: "carrental"
});


global.db = conn;


app.listen(3000, () => console.log("Server has started and listing on port 3000."));