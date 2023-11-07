import express,{Application,Request,Response,NextFunction} from 'express';
import { getAdminProducts, getAddProductPage,getAddedProductsPage,postAddProduct, postDeleteProduct} from "../controllers/adminCtrl";


const adminRoute = express.Router()

//ADMIN  get PRODUCTS ROUTE
adminRoute.get('/products',getAdminProducts)

adminRoute.get('/added-products',getAddedProductsPage)


//ADMIN  edit PRODUCTS ROUTE
adminRoute.get('/add-product',getAddProductPage)

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


adminRoute.post('/add-product',postAddProduct)




 adminRoute.post('/delete-product',postDeleteProduct); 


export default adminRoute