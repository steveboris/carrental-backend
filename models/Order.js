const Joi = require('joi');

function Order(body) {
    this.userID = body.userID;
    this.carID = body.carID;
    this.fromDate = body.fromDate;
    this.toDate = body.toDate;
    this.details = body.details;
}

// validate a Order
Order.prototype.validateOrder = function(order) {
    const schema = Joi.object({
        userID: Joi.number().required(),
        carID: Joi.number().required(),
        fromDate: Joi.any().required(),
        toDate: Joi.any().required(),
        details: Joi.string()
    });
    return schema.validate(order);
}

module.exports = Order