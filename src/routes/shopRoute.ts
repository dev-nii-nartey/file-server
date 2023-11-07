import express from 'express';
import {
  getShopProducts,
  downloadFile,
  sendMail,
  getHomePage,
  loggingOut,
  userValidation,
} from '../controllers/shopCtrl';
import passport from 'passport';

const shopRoute = express.Router();




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
shopRoute.get('/', getHomePage);

shopRoute.get('/login', getHomePage);



shopRoute.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/products',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

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

shopRoute.get('/products', getShopProducts);


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

shopRoute.post('/download', downloadFile);

shopRoute.post('/sendmail', sendMail);

shopRoute.get('/logout', loggingOut);

shopRoute.post('/register', userValidation);

export default shopRoute;
