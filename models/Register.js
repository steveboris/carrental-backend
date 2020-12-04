const Joi = require('joi');

function Register(body) {
    this.firstname = body.firstname;
    this.lastname = body.lastname;
    this.username = body.username;
    this.email = body.email;
    this.password = body.password;
    this.phone = body.phone;
    this.address = body.address;
    this.city = body.city;
    this.country = body.country;
    this.type = body.type;
}

// validate a registration
Register.prototype.validateRegistration = function(register) {
    const schema = Joi.object({
        firstname: Joi.string().min(5).max(50).required(),
        lastname: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(100).required().email(),
        username: Joi.string().min(5).max(120).required(),
        password: Joi.string().min(5).max(100).required(),
        phone: Joi.string().required(),
        address: Joi.string().min(10).max(100).required(),
        city: Joi.string().min(4).max(50).required(),
        country: Joi.string().min(4).max(50).required(),
        type: Joi.string().max(50).required()
    });
    return schema.validate(register);
}

module.exports = Register