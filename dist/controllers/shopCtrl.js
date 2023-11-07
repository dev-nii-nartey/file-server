"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.loggingOut = exports.sendMail = exports.transporter = exports.downloadFile = exports.getShopProducts = exports.getHomePage = void 0;
const path_1 = require("path");
const product_1 = __importDefault(require("../models/product"));
const nodemailer_1 = require("nodemailer");
const dbconfig_1 = __importDefault(require("../util/dbconfig"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//LOCAL MODULES
const pathHelper_1 = require("../util/pathHelper");
//getting shop products or Login if not authenticated
function getHomePage(req, res) {
    /*  if (req.isAuthenticated()) {
        return  res.redirect('/products');
    }  */
    res.redirect('/login');
}
exports.getHomePage = getHomePage;
//getting shop products
function getShopProducts(req, res, next) {
    /* if (req.isAuthenticated()) { */
    product_1.default.fetchAll((products) => {
        res.render('shop/product-list', {
            pageTitle: 'Liz Shop',
            prods: products,
            path: '/products',
        });
    });
    /* } */ /* else {
      res.redirect('login');
    } */
}
exports.getShopProducts = getShopProducts;
/* export function getShopProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
   if (req.isAuthenticated()) {
    Product.fetchAll((products:any)=>{
    res.render('shop/product-list', {
      pageTitle: 'Liz Shop',
      prods: products,
      path: '/products',

    });
    })

  }
  next();
  res.redirect('login');
} */
//downloading file controller
function downloadFile(req, res) {
    let file = req.body.filename;
    const thePath = (0, path_1.join)(require.main.filename, '../', '../', 'public', 'uploads', file);
    console.log(thePath);
    if (thePath.endsWith('.pdf')) {
        return res.sendFile(thePath);
    }
    else {
        return res.download(thePath);
    }
}
exports.downloadFile = downloadFile;
//mailing the file controller
//INVOKE NODEMAILER AND TRANSPORTER
exports.transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    auth: {
        user: pathHelper_1.mainAppMail.email,
        pass: pathHelper_1.mainAppMail.password,
    },
});
function sendMail(req, res) {
    const file = req.body.mailfilepath;
    const savePath = (0, path_1.join)(__dirname, '../', '../', 'public', 'uploads');
    exports.transporter.sendMail({
        from: 'Liz Delivery <' + pathHelper_1.mainAppMail.email + '>',
        to: req.body.email,
        subject: req.body.subject,
        html: `<p> ${req.body.note}</p>`,
        attachments: [
            {
                filename: file,
                path: (0, path_1.join)(savePath, file),
            },
        ],
    }, (err, info) => {
        if (err) {
            throw err;
        }
        else {
            res.json({ status: info.response });
        }
    });
    res.redirect('/products');
}
exports.sendMail = sendMail;
// Logging out CTLer
function loggingOut(req, res) {
    req.logOut((err) => {
        if (err) {
            console.error(err);
        }
        req.flash('success_msg', 'You have logged out');
        res.redirect('/login');
    });
}
exports.loggingOut = loggingOut;
async function userValidation(req, res) {
    let { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ message: 'Please enter all fields' });
    }
    if (password.length < 6) {
        errors.push({ message: 'Please should be at least 6 characters' });
    }
    if (password != password2) {
        errors.push({ message: 'Passwords do not match' });
    }
    if (errors.length > 0) {
        res.render('loginNregister/register', { errors });
    }
    else {
        //When Form validation passes
        let hashedPassword = await bcrypt_1.default.hash(password, 10);
        dbconfig_1.default.query(`SELECT * FROM users
        WHERE email = $1`, [email], (err, results) => {
            if (err) {
                throw err;
            }
            if (results.rows.length > 0) {
                errors.push({ message: 'Email already registered' });
                res.render('loginNregister/register', { errors });
            }
            else {
                dbconfig_1.default.query(`INSERT INTO users (name,email,password)
                VALUES ($1,$2,$3)
                RETURNING id,password`, [name, email, hashedPassword], (err, results) => {
                    if (err) {
                        throw err;
                    }
                    req.flash('success_msg', 'You are now registered, please login');
                    res.redirect('/login');
                });
            }
        });
    }
}
exports.userValidation = userValidation;
