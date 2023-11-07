"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shopCtrl_1 = require("../controllers/shopCtrl");
const passport_1 = __importDefault(require("passport"));
const shopRoute = express_1.default.Router();
//SHOP PRODUCTS ROUTE
// Define the /login endpoint
/**
 * @swagger
 * /login:
 *   get:
 *     summary: Check if Get home page wors
 *     description: Use this to check Homepage or Products list page.
 *     responses:
 *       200:
 *         description: Success message indicating that the GET method and HomePage are working.
 */
shopRoute.get('/', shopCtrl_1.getHomePage);
shopRoute.get('/login', shopCtrl_1.getHomePage);
shopRoute.post('/login', passport_1.default.authenticate('local', {
    successRedirect: '/products',
    failureRedirect: '/login',
    failureFlash: true,
}));
// Define the user-products endpoint
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get shop products
 *     responses:
 *       200:
 *         description: Successful response
 */
shopRoute.get('/products', shopCtrl_1.getShopProducts);
// Define the /downloading files and mailing files endpoint
/**
  * @swagger
 * /download:
 *   post:
 *     summary: Download a file
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filepath:
 *                 type: string
 *             required:
 *               - filepath
 *     responses:
 *       200:
 *         description: File download successful
 *       400:
 *         description: Bad request
 *       404:
 *         description: File not found
 *
 * /sendmail:
 *   post:
 *     summary: Send an email
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mailfilepath:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               note:
 *                 type: string
 *             required:
 *               - mailfilepath
 *               - email
 *               - subject
 *               - note
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
shopRoute.post('/download', shopCtrl_1.downloadFile);
shopRoute.post('/sendmail', shopCtrl_1.sendMail);
shopRoute.get('/logout', shopCtrl_1.loggingOut);
shopRoute.post('/register', shopCtrl_1.userValidation);
exports.default = shopRoute;
