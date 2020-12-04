const express = require('express');
const auth = require("../middleware/auth");
const Brand = require("../models/Brand");
const AppDataManager = require("../manager/appDataManager");

const appDataManager = new AppDataManager();
const router = express.Router();

router.post("/add", auth, async(req, res) => {
    try {
        var brand = new Brand(req.body);
        // check for error
        const { error } = brand.validateBrand(brand);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        
        let newRecord = await appDataManager.addBrand(brand);
        res.status(200).send({message: "New brand successfully added!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:value", auth, async(req, res) => {
    try {
        if (!req.params.value)
            return res.status(400).send({message: "The brand id is required!"});

        // first search by name
        let brand = await appDataManager.findBrandById(req.params.value);
        // check for not null
        if (brand.length == 0) {
            // search by date
            brand = await appDataManager.findBrandByName(req.params.value);
            if ( brand.length == 0 ) {
                brand = await appDataManager.findBrandByDate(req.params.value);
            }
        }
        res.status(200).send(brand);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/", auth, async(req, res) => {
    try {
        var brand = new Brand(req.body);
        // check for validation error
        const { error } = brand.validateBrand(brand);
        if (error)
            return res.status(400).send({message: error.details[0].message});
    
        brand.id = req.body.id;
        
        res.status(200).send(await appDataManager.updateBrand(brand.id, brand));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id)
            return res.status(400).send({message: "The brand id is required!"});
        
        await appDataManager.deleteBrand(req.params.id);
        res.status(200).send({message: "Brand successfully deleted!"});

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", auth, async(req, res) => {
    try {
        res.status(200).send(await appDataManager.findAllBrands());
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;