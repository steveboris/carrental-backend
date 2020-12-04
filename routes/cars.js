const express = require('express');
const auth = require("../middleware/auth");
const Car = require("../models/Car");
const AppDataManager = require("../manager/appDataManager");

const appDataManager = new AppDataManager();
const router = express.Router();

router.post("/add", auth, async(req, res) => {
    try {
        var car = new Car(req.body);
        // check for error
        const { error } = car.validateCar(car);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        
        let newRecord = await appDataManager.addCar(car);
        res.status(200).send({message: "New car successfully added!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/location/:locationID", auth, async(req, res) => {
    try {
        if (!req.params.locationID)
            return res.status(400).send({message: "The location id is required!"});

        // search a car by location
        let car = await appDataManager.findCarByLocation(req.params.locationID);
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/brand/:brandID", auth, async(req, res) => {
    try {
        if (!req.params.brandID)
            return res.status(400).send({message: "The brand id is required!"});

        // search a car by brand
        let car = await appDataManager.findCarByBrand(req.params.brandID);
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/category/:categoryID", auth, async(req, res) => {
    try {
        if (!req.params.categoryID)
            return res.status(400).send({message: "The category id is required!"});

        // search a car by category
        let car = await appDataManager.findCarByCategory(req.params.categoryID);
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get("/color/:colorID", auth, async(req, res) => {
    try {
        if (!req.params.colorID)
            return res.status(400).send({message: "The color id is required!"});

        // search a car by color
        let car = await appDataManager.findCarByColor(req.params.colorID);
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get("/fuelType/:fuelTypeID", auth, async(req, res) => {
    try {
        if (!req.params.fuelTypeID)
            return res.status(400).send({message: "The fuelType id is required!"});

        // search a car by fuelType
        let car = await appDataManager.findCarByFuelType(req.params.fuelTypeID);
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/capacity/:capacityID", auth, async(req, res) => {
    try {
        if (!req.params.capacityID)
            return res.status(400).send({message: "The capacity id is required!"});

        // search a car by capacity
        let car = await appDataManager.findCarByCapacity(req.params.capacityID);
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/year/:yearID", auth, async(req, res) => {
    try {
        if (!req.params.yearID)
            return res.status(400).send({message: "The year id is required!"});

        // search a car by year
        let car = await appDataManager.findCarByYear(req.params.yearID);
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/", auth, async(req, res) => {
    try {
        var car = new Car(req.body);
        // check for validation error
        const { error } = car.validateCar(car);
        if (error)
            return res.status(400).send({message: error.details[0].message});
    
        car.id = req.body.id;
        res.status(200).send(await appDataManager.updateCar(car.id, car));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id)
            return res.status(400).send({message: "The car id is required!"});
        
        await appDataManager.deleteCar(req.params.id);
        res.status(200).send({message: "Car successfully deleted!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", auth, async(req, res) => {
    try {
        res.status(200).send(await appDataManager.findAllCars());
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;