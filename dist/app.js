"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//GLOBAL MODULES
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const path_1 = require("path");
const body_parser_1 = require("body-parser");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
/* import pgSession from 'connect-pg-simple'; */
const pgSession = require('connect-pg-simple')(express_session_1.default);
const dbconfig_1 = __importDefault(require("./util/dbconfig")); // Import the pool from your dbconfig file
//LOCAL MODULES
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const shopRoute_1 = __importDefault(require("./routes/shopRoute"));
const passportConfig_1 = __importDefault(require("./util/passportConfig"));
const swagger_1 = __importDefault(require("./util/swagger"));
const PORT = 3000;
const app = (0, express_1.default)();
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (str, newStr) {
        // If a regex pattern
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }
        // If a string
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}
//SETTING UP VIEW ENGINE TO EJS
app.set('view engine', 'ejs');
app.set('views', 'views');
//SET STATIC EXPRESS
app.use((0, express_2.static)((0, path_1.join)(__dirname, '../', 'public')));
// Enable CORS for all routes
app.use((0, cors_1.default)());
//SET BODY PARSER LIBRARY
app.use((0, body_parser_1.urlencoded)({ extended: false }));
app.use(express_1.default.json());
// Use connect-pg-simple for session store
app.use((0, express_session_1.default)({
    store: new pgSession({
        pool: dbconfig_1.default,
        tableName: 'session',
        escapePgIdentifier: (value) => value.replace(/"/g, '""')
    }),
    secret: process.env.SESSION_SECRET || 'your secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
//FLASH
app.use((0, express_flash_1.default)());
//PASSPORT INITIALIZING
(0, passportConfig_1.default)(passport_1.default);
app.use(passport_1.default.session());
app.use(passport_1.default.initialize());
//INVOKE FILEUPLOAD
app.use((0, express_fileupload_1.default)());
//LOGIN and/or REGISTER ROUTE
app.use(loginRoute_1.default);
//ADMIN PRODUCTS PAGE
app.use('/admin', adminRoute_1.default);
//SHOP PRODUCTS PAGE
app.use(shopRoute_1.default);
//SWAGGER UI AND JSDOC
(0, swagger_1.default)(app, PORT);
exports.default = app;
app.listen(process.env.PORT || PORT);
