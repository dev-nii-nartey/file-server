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
import request from 'supertest';
import express, { Application } from 'express';
import { getAdminProducts, getAddedProductsPage, getAddProductPage, postAddProduct } from '../controllers/adminCtrl';
import Product from '../models/product';

const app: Application = express();

app.get('/admin/products', getAdminProducts);
app.get('/admin/added-products', getAddedProductsPage);
app.get('/admin/add-product', getAddProductPage);
app.post('/admin/add-product', postAddProduct);

jest.mock('../models/product');

describe('Admin Controller', () => {
  it('should fetch all admin products', async () => {
    (Product.fetchAll as jest.Mock).mockResolvedValue([]);
    const res = await request(app).get('/admin/products');
    expect(res.status).toBe(200);
  }, 10000); // 10 seconds timeout

  it('should fetch added products page', async () => {
    (Product.fetchAll as jest.Mock).mockResolvedValue([]);
    const res = await request(app).get('/admin/added-products');
    expect(res.status).toBe(200);
  }, 10000); // 10 seconds timeout

  it('should get add product page', async () => {
    const res = await request(app).get('/admin/add-product');
    expect(res.status).toBe(200);
  }, 10000); // 10 seconds timeout

  it('should add a product', async () => {
    const res = await request(app)
      .post('/admin/add-product')
      .field('title', 'Test Product')
      .field('description', 'Test Description')
      .attach('myfile', __dirname + '/test.jpg');
    expect(res.status).toBe(302);
  }, 10000); // 10 seconds timeout
});