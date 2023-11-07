import express, { Application, Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { dirname, join } from 'path';
import Product from '../models/product';

//ADMIN ALL PRODUCTS CTRLer
export function getAdminProducts(req: Request, res: Response) {
   Product.fetchAll((products:any)=>{
     res.render('admin/adminProducts', {
    pageTitle: 'Admin',
    prods: products,
    path: "/admin/products",
/*     activeShop: true,
    productCSS: true, */
  });
   });
 
}

//Admin Editing Page  rem. to work on
export function getAddedProductsPage(req: Request, res: Response) {
   Product.fetchAll((products:any)=>{
     res.render('admin/added-products', {
    pageTitle: 'Added Products',
    prods: products,
    path: '/',
/*     activeShop: true,
    productCSS: true, */
  });
   });
 
}

//ADDING A FILE PRODUCT CTRLer
// /admin/add-product => GET
export function getAddProductPage(req: Request, res: Response) {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: "/admin/add-product",
/*     activeShop: true,
    productCSS: true, */
  });
}

// /admin/add-product => POST
export function postAddProduct(req: Request, res: Response) {
  const imageUrl =
    'https://ae01.alicdn.com/kf/HTB1XPyERFXXXXb3XVXXq6xXFXXXr/20Pcs-Lot-Kraft-Paper-Sealing-File-Package-Bags-Retro-Brown-Documents-Pocket-For-Bills-A4-Paper.jpg';
  const title = req.body.title;
  const theFile = req.files!.myfile;
  const description = req.body.description;
  const file = theFile as UploadedFile;
  const fileName = file.name
  const savePath = join(
    __dirname,
    '../',
    '../',
    'public',
    'uploads',
    fileName
  );
  file.mv(savePath);

  const product = new Product(title, imageUrl, description, fileName);

  product.save();
  res.redirect('/admin/products');
}

 
export function postDeleteProduct(req: Request, res: Response) {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}
