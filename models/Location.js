const Joi = require('joi');

function Location(body) {
    this.name = body.name;
    this.country = body.country;
    this.dateOfCreation = body.dateOfCreation;
}

// validate a location
Location.prototype.validateLocation = function(location) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        country: Joi.string().min(5).max(50).required(),
        dateOfCreation: Joi.any().required()
    });
    return schema.validate(location);
}

module.exports = Location