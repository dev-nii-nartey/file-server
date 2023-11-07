"use strict";
/* import request from 'supertest';
import app from '../app'; // Make sure to import your express app

describe('downloadFile middleware', () => {
  it('should respond with an error when no file is specified', async () => {
    const res = await request(app)
      .post('/download')
      .send({});

    expect(res.status).toBe(400);
  });
}); */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Testing GET all products
/* import request from 'supertest';
import app from '../app'; // Make sure to import your express app
import shopRoute from "../routes/shopRoute";


describe('getShopProducts middleware', () => {
  it('should fetch all products and render the product list', async () => {
    const res = await request(app)
      .get('/products') // Replace with the route that uses getShopProducts middleware
      .send();

    expect(res.status).toBe(200);
    expect(res.text).toContain('Liz Shop'); // Check if the response contains 'Liz Shop'
  });
}); */
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const adminCtrl_1 = require("../controllers/adminCtrl");
const product_1 = __importDefault(require("../models/product"));
const app = (0, express_1.default)();
app.get('/admin/products', adminCtrl_1.getAdminProducts);
app.get('/admin/added-products', adminCtrl_1.getAddedProductsPage);
app.get('/admin/add-product', adminCtrl_1.getAddProductPage);
app.post('/admin/add-product', adminCtrl_1.postAddProduct);
jest.mock('../models/product');
describe('Admin Controller', () => {
    it('should fetch all admin products', async () => {
        product_1.default.fetchAll.mockResolvedValue([]);
        const res = await (0, supertest_1.default)(app).get('/admin/products');
        expect(res.status).toBe(200);
    }, 10000); // 10 seconds timeout
    it('should fetch added products page', async () => {
        product_1.default.fetchAll.mockResolvedValue([]);
        const res = await (0, supertest_1.default)(app).get('/admin/added-products');
        expect(res.status).toBe(200);
    }, 10000); // 10 seconds timeout
    it('should get add product page', async () => {
        const res = await (0, supertest_1.default)(app).get('/admin/add-product');
        expect(res.status).toBe(200);
    }, 10000); // 10 seconds timeout
    it('should add a product', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/admin/add-product')
            .field('title', 'Test Product')
            .field('description', 'Test Description')
            .attach('myfile', __dirname + '/test.jpg');
        expect(res.status).toBe(302);
    }, 10000); // 10 seconds timeout
});
