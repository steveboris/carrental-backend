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

    deletebrand(brandID) {
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
}

module.exports = AppDataManager