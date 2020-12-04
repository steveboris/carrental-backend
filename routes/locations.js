const express = require('express');
const auth = require("../middleware/auth");
const Location = require("../models/Location");
const AppDataManager = require("../manager/appDataManager");

const appDataManager = new AppDataManager();
const router = express.Router();

router.post("/add", auth, async(req, res) => {
    try {
        var location = new Location(req.body);
        // check for error
        const { error } = location.validateLocation(location);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        
        let newRecord = await appDataManager.addLocation(location);
        res.status(200).send({message: "New location successfully added!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:name", auth, async(req, res) => {
    try {
        if (!req.params.name)
            return res.status(400).send({message: "The location name is required!"});

        // first search by name
        let location = await appDataManager.findLocationByName(req.params.name);
        
        res.status(200).send(location);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/", auth, async(req, res) => {
    try {
        var location = new Location(req.body);
        // check for validation error
        const { error } = location.validateLocation(location);
        if (error)
            return res.status(400).send({message: error.details[0].message});
    
        location.id = req.body.id;
        
        res.status(200).send(await appDataManager.updateLocation(location.id, location));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id)
            return res.status(400).send({message: "The brand id is required!"});
        
        await appDataManager.deleteLocation(req.params.id);
        res.status(200).send({message: "Location successfully deleted!"});

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", auth, async(req, res) => {
    try {
        res.status(200).send(await appDataManager.findAllLocations());
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;