"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_local_1 = require("passport-local");
const dbconfig_1 = __importDefault(require("./dbconfig"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        dbconfig_1.default.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
            if (err) {
                throw err;
            }
            if (results.rows.length > 0) {
                const user = results.rows[0];
                bcrypt_1.default.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {
                            message: 'password is not correct',
                        });
                    }
                });
            }
            else {
                return done(null, false, { message: 'Email not registered' });
            }
        });
    };
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        dbconfig_1.default.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {
                throw err;
            }
            else {
                return done(null, results.rows[0]);
            }
        });
    });
}
exports.default = initialize;
