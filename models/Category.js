const Joi = require('joi');

function Category(body) {
    this.name = body.name;
    this.dateOfCreation = body.dateOfCreation;
}

// validate a Category
Category.prototype.validateCategory = function(category) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        dateOfCreation: Joi.any().required()
    });
    return schema.validate(category);
}

module.exports = Category