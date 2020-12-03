const jwt = require("jsonwebtoken");
const Joi = require('joi');
const config = require("config");


function Login(body) {
    this.username = body.username;
    this.password = body.password;
}

Login.prototype.validateLogin = function(login) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(120).required(),
        password: Joi.string().min(5).max(100).required()
    });
    return schema.validate(login);
}

// generate token after login successful
Login.prototype.generateToken = function(login) {
    const token = jwt.sign({
        id: login.id,
        username: login.username
    }, config.get("jwtPrivateKey"), {expiresIn: config.get("expireIn")});

    return token;
}

module.exports = Login