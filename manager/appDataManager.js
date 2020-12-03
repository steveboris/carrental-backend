const { decodeBase64 } = require("bcryptjs");
const { use } = require("../routes/users");
const router = require("../routes/users");
const Database = require("./database");

class AppDataManager {

    findAllUsers() {
        return db.query("SELECT * FROM users").then(rows => {
            return rows;
        }).catch(err => {
            console.log(err);
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
}

module.exports = AppDataManager