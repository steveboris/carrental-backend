const express = require('express');
const auth = require("../middleware/auth");
const Category = require("../models/Category");
const AppDataManager = require("../manager/appDataManager");

const appDataManager = new AppDataManager();
const router = express.Router();

router.post("/add", auth, async(req, res) => {
    try {
        var category = new Category(req.body);
        // check for error
        const { error } = category.validateCategory(category);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        
        let newRecord = await appDataManager.addCategory(category);
        res.status(200).send({message: "New category successfully added!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:name", auth, async(req, res) => {
    try {
        if (!req.params.name)
            return res.status(400).send({message: "The category name is required!"});
        // first search by name
        let category = await appDataManager.findCategoryByName(req.params.name);
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/", auth, async(req, res) => {
    try {
        var category = new Category(req.body);
        // check for validation error
        const { error } = category.validateCategory(category);
        if (error)
            return res.status(400).send({message: error.details[0].message});

        category.id = req.body.id;
        res.status(200).send(await appDataManager.updateCategory(category.id, category));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id)
            return res.status(400).send({message: "The category id is required!"});
        
        await appDataManager.deleteCategory(req.params.id);
        res.status(200).send({message: "Category successfully deleted!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", auth, async(req, res) => {
    try {
        res.status(200).send(await appDataManager.findAllCategories());
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;