const Joi = require('joi');

function Car(body) {
    this.title = body.title;
    this.brandID = body.brandID;
    this.locationID = body.locationID;
    this.categoryID = body.categoryID;
    this.color = body.color;
    this.details = body.details;
    this.pricePerDay = body.pricePerDay;
    this.fuelType = body.fuelType;
    this.modelYear = body.modelYear;
    this.seatingCapacity = body.seatingCapacity;
    this.image1 = body.image1;
    this.image2 = body.image2;
    this.image3 = body.image3;
    this.image4 = body.image4;
    this.registrationDate = body.registrationDate;
}

// validate a Car
Car.prototype.validateCar = function(car) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        brandID: Joi.number().required(),
        locationID: Joi.number().required(),
        categoryID: Joi.number().required(),
        color: Joi.string().min(2).max(20).required(),
        details: Joi.string().required(),
        pricePerDay: Joi.number().required(),
        fuelType: Joi.string().min(2).max(20).required(),
        modelYear: Joi.number().required(),
        seatingCapacity: Joi.number().required(),
        image1: Joi.string().required(),
        image2: Joi.string().required(),
        image3: Joi.string().required(),
        image4: Joi.string().required(),
        registrationDate: Joi.any().required()
    });
    return schema.validate(car);
}

module.exports = Car