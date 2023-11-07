"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const pg_1 = require("pg");
const envPath = path_1.default.resolve(__dirname, '.env');
/* console.log(envPath) */
dotenv_1.default.config({ path: envPath });
const isProduction = process.env.NODE_ENV === 'production';
/* console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_DATABASE:', process.env.DB_DATABASE); */
/* const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`; */
const connectionString = `postgres://nodelogin_p3gk_user:Bcdzs3WUeEDEjeOruiCntoyHLXnYIBum@dpg-cl1svugp2gis73fna74g-a.oregon-postgres.render.com/nodelogin_p3gk`;
/* console.log('connectionString:', connectionString); */
const pool = new pg_1.Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});
exports.default = pool;
