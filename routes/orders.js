const express = require('express');
const auth = require("../middleware/auth");
const Order = require("../models/Order");
const AppDataManager = require("../manager/appDataManager");

const appDataManager = new AppDataManager();
const router = express.Router();


router.post("/add", auth, async(req, res) => {
    try {
        var order = new Order(req.body);
        // check for error
        const { error } = order.validateOrder(order);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        
        // compute the total price before add the new record
        let car = await appDataManager.findCarByID(order.carID);
        let dayPrice = car[0].pricePerDay;
        let difference = new Date(order.toDate).getTime() - new Date(order.fromDate).getTime();
        let daysDifference = Math.floor(difference/1000/60/60/24);
        let price = daysDifference * dayPrice;
        //
        order.price = price;

        let newRecord = await appDataManager.addOrder(order);
        res.status(200).send({message: "New order successfully added!"});
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get("/date/:date", auth, async(req, res) => {
    try {
        if (!req.params.date)
            return res.status(400).send({message: "The date is required!"});

        // Search by date
        let order = await appDataManager.findOrderByDate(req.params.date);
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/user/:user", auth, async(req, res) => {
    try {
        if (!req.params.user)
            return res.status(400).send({message: "The user id is required!"});

        // Search by user
        let order = await appDataManager.findOrderByUser(req.params.user);
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/", auth, async(req, res) => {
    try {
        var order = new Order(req.body);
        // check for validation error
        const { error } = order.validateOrder(order);
        if (error)
            return res.status(400).send({message: error.details[0].message});
    
        order.id = req.body.id;
        res.status(200).send(await appDataManager.updateOrder(order.id, order));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id)
            return res.status(400).send({message: "The order id is required!"});
        
        await appDataManager.deleteOrder(req.params.id);
        res.status(200).send({message: "Order successfully deleted!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", auth, async(req, res) => {
    try {
        res.status(200).send(await appDataManager.findAllOrders());
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;