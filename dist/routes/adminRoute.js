"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminCtrl_1 = require("../controllers/adminCtrl");
const adminRoute = express_1.default.Router();
//ADMIN  get PRODUCTS ROUTE
adminRoute.get('/products', adminCtrl_1.getAdminProducts);
adminRoute.get('/added-products', adminCtrl_1.getAddedProductsPage);
//ADMIN  edit PRODUCTS ROUTE
adminRoute.get('/add-product', adminCtrl_1.getAddProductPage);
/**
 * @swagger
 * /admin/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the given details
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               myfile:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
adminRoute.post('/add-product', adminCtrl_1.postAddProduct);
adminRoute.post('/delete-product', adminCtrl_1.postDeleteProduct);
exports.default = adminRoute;
