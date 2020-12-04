const { decodeBase64 } = require("bcryptjs");
const { use } = require("../routes/users");
const router = require("../routes/users");
const Database = require("./database");

class AppDataManager {

    // user
    findAllUsers() {
        return db.query("SELECT * FROM users").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findUserByID(userID) {
        return db.query("SELECT * FROM users WHERE id = ?", userID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err)
        });
    }
    
    findUserByEmail(email) {
        return db.query("SELECT * FROM users WHERE email = ?", email).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err)
        });
    }

    findUserByUsername(username) {
        return db.query("SELECT * FROM users WHERE username = ?", username).then(rows => {
            return rows;
        }).catch(err => { 
            console.log(err) 
        });
    }

    deleteUser(userId) {
        return db.query("DELETE FROM users WHERE id = ?", userId).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    register(register) {
        return db.query("INSERT INTO users (firstname, lastname, email, username, password, phone, address, city, country, type, registrationDate, lastUpdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            register.firstname,
            register.lastname,
            register.email,
            register.username,
            register.password,
            register.phone,
            register.address,
            register.city,
            register.country,
            register.type,
            register.registrationDate,
            register.lastUpdate
        ]);
    }

    updateUser(userid, user) {
        return db.query("UPDATE users SET firstname = ?, lastname = ?, phone = ?, address = ?, city = ?, country = ?, type = ?, registrationDate = ? WHERE id = ?", [
            user.firstname,
            user.lastname,
            user.phone,
            user.address,
            user.city,
            user.country,
            user.type,
            user.registrationDate,
            userid
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }
    
    // brand
    addBrand(brand) {
        return db.query("INSERT INTO brands (name, dateOfCreation, lastUpdate) VALUES (?, ?, ?)", [
            brand.name,
            brand.dateOfCreation,
            brand.lastUpdate
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findBrandById(brandID) {
        return db.query("SELECT * FROM brands WHERE id = ?", brandID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findBrandByName(name) {
        return db.query("SELECT * FROM brands WHERE name LIKE ?", "%" + name + "%").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findBrandByDate(date) {
        return db.query("SELECT * FROM brands WHERE dateOfCreation LIKE ?", "%" + date + "%").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    updateBrand(brandID, brand) {
        return db.query("UPDATE brands SET name = ?, dateOfcreation = ? WHERE id = ?", [
            brand.name,
            brand.dateOfCreation,
            brandID
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    deleteBrand(brandID) {
        return db.query("DELETE FROM brands WHERE id = ?", brandID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findAllBrands() {
        return db.query("SELECT * FROM brands").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    // locations
    addLocation(location) {
        return db.query("INSERT INTO locations (name, country, dateOfCreation) VALUES (?, ?, ?)", [
            location.name,
            location.country,
            location.dateOfCreation
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findLocationByName(name) {
        return db.query("SELECT * FROM locations WHERE name LIKE ?", "%" + name + "%").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    updateLocation(locationID, location) {
        return db.query("UPDATE locations SET name = ?, country = ?, dateOfcreation = ? WHERE id = ?", [
            location.name,
            location.country,
            location.dateOfCreation,
            locationID
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    deleteLocation(locationID) {
        return db.query("DELETE FROM locations WHERE id = ?", locationID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findAllLocations() {
        return db.query("SELECT * FROM locations").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    // categories
    addCategory(category) {
        return db.query("INSERT INTO categories (name, dateOfCreation) VALUES (?, ?)", [
            category.name,
            category.dateOfCreation
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCategoryByName(name) {
        return db.query("SELECT * FROM categories WHERE name LIKE ?", "%" + name + "%").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    updateCategory(categoryID, category) {
        return db.query("UPDATE categories SET name = ?, dateOfcreation = ? WHERE id = ?", [
            category.name,
            category.dateOfCreation,
            categoryID
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    deleteCategory(categoryID) {
        return db.query("DELETE FROM categories WHERE id = ?", categoryID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findAllCategories() {
        return db.query("SELECT * FROM categories").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    // contact
    addContact(contact) {
        return db.query("INSERT INTO contacts (name, userID, phone, details, postingDate, status) VALUES (?, ?, ?, ?, ?, ?)", [
            contact.name,
            contact.userID,
            contact.phone,
            contact.details,
            contact.postingDate,
            contact.status
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findContactByUser(userID) {
        return db.query("SELECT * FROM contacts WHERE userID = ?", userID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    updateContact(contactID, contact) {
        return db.query("UPDATE contacts SET name = ?, userID = ?, phone = ?, details = ?, postingDate = ?, status = ? WHERE id = ?", [
            contact.name,
            contact.userID,
            contact.phone,
            contact.details,
            contact.postingDate,
            contact.status,
            contactID
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    deleteContact(contactID) {
        return db.query("DELETE FROM contacts WHERE id = ?", contactID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findAllContacts() {
        return db.query("SELECT * FROM contacts").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    // cars
    addCar(car) {
        return db.query("INSERT INTO cars (title, brandID, locationID, categoryID, color, details, pricePerDay, fuelType, modelYear, seatingCapacity, image1, image2, image3, image4, registrationDate, lastUpdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            car.title,
            car.brandID,
            car.locationID,
            car.categoryID,
            car.color,
            car.details,
            car.pricePerDay,
            car.fuelType,
            car.modelYear,
            car.seatingCapacity,
            car.image1,
            car.image2,
            car.image3,
            car.image4,
            car.registrationDate,
            car.lastUpdate
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByID(carID) {
        return db.query("SELECT * FROM cars WHERE id = ?", carID).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByLocation(locationID) {
        return db.query("SELECT * FROM cars WHERE locationID = ?", locationID).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByBrand(brandID) {
        return db.query("SELECT * FROM cars WHERE brandID = ?", brandID).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByCategory(catID) {
        return db.query("SELECT * FROM cars WHERE categoryID = ?", catID).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByColor(color) {
        return db.query("SELECT * FROM cars WHERE color = ?", color).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByFuelType(type) {
        return db.query("SELECT * FROM cars WHERE fuelType = ?", type).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByCapacity(capacity) {
        return db.query("SELECT * FROM cars WHERE seatingCapacity = ?", capacity).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findCarByYear(year) {
        return db.query("SELECT * FROM cars WHERE modelYear = ?", year).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    updateCar(carID, car) {
        return db.query("UPDATE cars SET title = ?, brandID = ?, locationID = ?, categoryID = ?, color = ?, details = ?, pricePerDay = ?, fuelType = ?, modelYear = ?, seatingCapacity = ?, image1 = ?, image2 = ?, image3 = ?, image4 = ?, registrationDate = ?, lastUpdate = ? WHERE id = ?", [
            car.title,
            car.brandID,
            car.locationID,
            car.categoryID,
            car.color,
            car.details,
            car.pricePerDay,
            car.fuelType,
            car.modelYear,
            car.seatingCapacity,
            car.image1,
            car.image2,
            car.image3,
            car.image4,
            car.registrationDate,
            car.lastUpdate,
            carID
        ]).then(rows => {
            return rows;
        }).catch( err => {
            console.log(err);
        });
    }

    deleteCar(carID) {
        return db.query("DELETE FROM cars WHERE id = ?", carID).then( rows => {
            return rows;
        }).catch( err => {
            console.log(err);
        })
    }

    findAllCars() {
        return db.query("SELECT * FROM cars").then( rows => {
            return rows;
        }).catch( err => {
            console.log(err);
        });
    }

    // orders
    addOrder(order) {
        return db.query("INSERT INTO orders (userID, carID, fromDate, toDate, details, date, price) VALUES (?, ?, ?, ?, ?, ?, ?)", [
            order.userID,
            order.carID,
            order.fromDate,
            order.toDate,
            order.details,
            order.date,
            order.price
        ]).then( rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findOrderByDate(date) {
        return db.query("SELECT * FROM orders WHERE date LIKE ?", "%" + date + "%").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findOrderByUser(userID) {
        return db.query("SELECT * FROM orders WHERE userID = ?", userID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    updateOrder(orderID, order) {
        return db.query("UPDATE orders SET userID = ?, carID = ?, fromDate = ?, toDate = ?, details = ?, date = ?, price = ? WHERE id = ?", [
            order.userID,
            order.carID,
            order.fromDate,
            order.toDate,
            order.details,
            order.date,
            order.price,
            orderID
        ]).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    deleteOrder(orderID) {
        return db.query("DELETE FROM orders WHERE id = ?", orderID).then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }

    findAllOrders() {
        return db.query("SELECT * FROM orders").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
        });
    }
}

module.exports = AppDataManager