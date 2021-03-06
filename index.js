const express = require('express');
const app = express();
const database = require('./manager/database');
const users = require('./routes/users');
const brands = require('./routes/brands');
const locations = require('./routes/locations');
const categories = require('./routes/categories');
const contacts = require('./routes/contacts');
const cars = require('./routes/cars');
const orders = require('./routes/orders');

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
app.use("/api/v1/locations", locations);
app.use("/api/v1/categories", categories);
app.use("/api/v1/contacts", contacts);
app.use("/api/v1/cars", cars);
app.use("/api/v1/orders", orders);

app.listen(3000, () => console.log("The server is running and listening on port 3000."));