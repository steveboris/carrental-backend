const Joi = require('joi');

function Contact(body) {
    this.name = body.name;
    this.userID = body.userID;
    this.phone = body.phone;
    this.details = body.details;
    this.postingDate = body.postingDate;
    this.status = body.status;
}

// validate a Contact
Contact.prototype.validateContact = function(contact) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        userID: Joi.number().required(),
        phone: Joi.string().max(30).required(),
        details: Joi.string(),
        postingDate: Joi.any().required(),
        status: Joi.number().required()
    });
    return schema.validate(contact);
}

module.exports = Contact