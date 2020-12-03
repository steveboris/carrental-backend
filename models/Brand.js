const Joi = require('joi');

function Brand(body) {
    this.name = body.name;
    this.dateOfCreation = body.dateOfCreation;
}

// validate a brand
Brand.prototype.validateBrand = function(brand) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        dateOfCreation: Joi.any().required()
    });
    return schema.validate(brand);
}

module.exports = Brand