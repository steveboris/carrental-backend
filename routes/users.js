const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
var Register = require('../models/Register');
var Login = require("../models/Login");

const auth = require("../middleware/auth");
const AppDataManager = require("../manager/appDataManager");

const appDataManager = new AppDataManager();
const router = express.Router();

const validateUser = function (user) {
    const schema = Joi.object({
        firstname: Joi.string().min(5).max(50).required(),
        lastname: Joi.string().min(5).max(50).required(),
        phone: Joi.string().required(),
        address: Joi.string().min(10).max(100).required(),
        city: Joi.string().min(4).max(50).required(),
        country: Joi.string().min(4).max(50).required(),
        type: Joi.string().max(50),
        id: Joi.number().required()
    });
    return schema.validate(user);
};

// users registration
router.post("/register", async(req, res) => {
    try {
        var register = new Register(req.body);
        const { error } = register.validateRegistration(register);
        // check for error
        if (error) 
            return res.status(400).send({message: error.details[0].message});
        // check for duplication
        let findByEmail = await appDataManager.findUserByEmail(register.email);
        if (findByEmail.length != 0) 
            return res.status(400).send({message: "Email already taken"});
    
        let findByUsername = await appDataManager.findUserByUsername(register.username);
        if (findByUsername.length != 0) 
            return res.status(400).send({message: "Username already taken"});
        // encrypt the passwword
        const salt = await bcrypt.genSalt(10);
        register.password = await bcrypt.hash(register.password, salt);

        let user = await appDataManager.register(register);
        res.status(200).send("User successful registered!");
    } catch (error) {
        res.status(400).send(error);
    }
});

// users login. The user can use his username or his email to logIn
router.post("/login", async(req, res) => {
    try {
        var login = new Login(req.body);
        const { error } = login.validateLogin(login);
        // check for error
        if (error) 
            return res.status(400).send({message: error.details[0].message});

        var userInfo = await appDataManager.findUserByUsername(login.username);

        if (userInfo.length == 0) {
            // check if the user want to logIn with email
            userInfo = await appDataManager.findUserByEmail(login.username); 
            if ((userInfo.length == 0))
                return res.status(400).send({message: "Invalid username or password"});
        }

        const validPwd = await bcrypt.compare(login.password, userInfo[0].password);
    
        if (!validPwd) { 
            return res.status(400).send({message: "Invalid username or passwordd"});
        }

        login.id = userInfo[0].id;
        res.status(200).send( { token: await login.generateToken(login) });
    } catch (error) {
        res.status(400).send(error);
    }
});

// adds user
router.post("/add", auth, async(req, res) => {
    try {
        var register = new Register(req.body);
        const { error } = register.validateRegistration(register);
        // check for error
        if (error) 
            return res.status(400).send({message: error.details[0].message});
        // check for duplication
        let findByEmail = await appDataManager.findUserByEmail(register.email);
        if (findByEmail.length != 0) 
            return res.status(400).send({message: "Email already taken"});
    
        let findByUsername = await appDataManager.findUserByUsername(register.username);
        if (findByUsername.length != 0) 
            return res.status(400).send({message: "Username already taken"});
        // encrypt the passwword
        const salt = await bcrypt.genSalt(10);
        register.password = await bcrypt.hash(register.password, salt);

        let user = await appDataManager.register(register);
        res.status(200).send("User successful added!");
    } catch (error) {
        res.status(400).send(error);
    }
});

// gets users
router.get("/", auth, async(req, res) => {
    try {
        let users = await appDataManager.findAllUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

// gets user
router.get("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id) 
            return res.status(400).send({message: "The user id is required!"});
        
        res.status(200).send(await appDataManager.findUserByID(req.params.id));
    } catch (error) {
        res.status(400).send(error);
    }
});

// updates user
router.put("/", auth, async(req, res) => {
    try {  
        if (!req.body.id)
            return res.status(400).send({message: "The user id is required!"});

        var user = req.body;
        // check for user validation
        const { error } = validateUser(user);
        if (error) 
            return res.status(400).send({message: error.details[0].message});
       
        res.status(200).send(await appDataManager.updateUser(user.id, user));
    } catch (error) {
        res.status(400).send(error);
    }
});

// deletes a user
router.delete("/:id", auth, async(req, res) => {
    try {
        if (!req.params.id)
            return res.status(400).send({message: "The user id is required!"});

        let user = await appDataManager.deleteUser(req.user.id);
        res.status(200).send({ message: "User successfully deleted!" });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;