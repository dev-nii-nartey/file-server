"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.postAddProduct = exports.getAddProductPage = exports.getAddedProductsPage = exports.getAdminProducts = void 0;
const path_1 = require("path");
const product_1 = __importDefault(require("../models/product"));
//ADMIN ALL PRODUCTS CTRLer
function getAdminProducts(req, res) {
    product_1.default.fetchAll((products) => {
        res.render('admin/adminProducts', {
            pageTitle: 'Admin',
            prods: products,
            path: "/admin/products",
            /*     activeShop: true,
                productCSS: true, */
        });
    });
}
exports.getAdminProducts = getAdminProducts;
//Admin Editing Page  rem. to work on
function getAddedProductsPage(req, res) {
    product_1.default.fetchAll((products) => {
        res.render('admin/added-products', {
            pageTitle: 'Added Products',
            prods: products,
            path: '/',
            /*     activeShop: true,
                productCSS: true, */
        });
    });
}
exports.getAddedProductsPage = getAddedProductsPage;
//ADDING A FILE PRODUCT CTRLer
// /admin/add-product => GET
function getAddProductPage(req, res) {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: "/admin/add-product",
        /*     activeShop: true,
            productCSS: true, */
    });
}
exports.getAddProductPage = getAddProductPage;
// /admin/add-product => POST
function postAddProduct(req, res) {
    const imageUrl = 'https://ae01.alicdn.com/kf/HTB1XPyERFXXXXb3XVXXq6xXFXXXr/20Pcs-Lot-Kraft-Paper-Sealing-File-Package-Bags-Retro-Brown-Documents-Pocket-For-Bills-A4-Paper.jpg';
    const title = req.body.title;
    const theFile = req.files.myfile;
    const description = req.body.description;
    const file = theFile;
    const fileName = file.name;
    const savePath = (0, path_1.join)(__dirname, '../', '../', 'public', 'uploads', fileName);
    file.mv(savePath);
    const product = new product_1.default(title, imageUrl, description, fileName);
    product.save();
    res.redirect('/admin/products');
}
exports.postAddProduct = postAddProduct;
function postDeleteProduct(req, res) {
    const prodId = req.body.productId;
    product_1.default.deleteById(prodId);
    res.redirect('/admin/products');
}
exports.postDeleteProduct = postDeleteProduct;
