const express = require('express');
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");
const AppDataManager = require("../manager/appDataManager");

const appDataManager = new AppDataManager();
const router = express.Router();

router.post("/add", auth, async(req, res) => {
    try {
        var contact = new Contact(req.body);
        // check for error
        const { error } = contact.validateContact(contact);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        
        let newRecord = await appDataManager.addContact(contact);
        res.status(200).send({message: "New contact successfully added!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:userID", auth, async(req, res) => {
    try {
        if (!req.params.userID)
            return res.status(400).send({message: "The user is required!"});

        // first search by user
        let contact = await appDataManager.findContactByUser(req.params.userID);
        res.status(200).send(contact);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put("/", auth, async(req, res) => {
    try {
        var contact = new Contact(req.body);
        // check for validation error
        const { error } = contact.validateContact(contact);
        if (error)
            return res.status(400).send({message: error.details[0].message});
    
        contact.id = req.body.id;
        res.status(200).send(await appDataManager.updateContact(contact.id, contact));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id)
            return res.status(400).send({message: "The contact id is required!"});
        
        await appDataManager.deleteContact(req.params.id);
        res.status(200).send({message: "Contact successfully deleted!"});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", auth, async(req, res) => {
    try {
        res.status(200).send(await appDataManager.findAllContacts());
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;