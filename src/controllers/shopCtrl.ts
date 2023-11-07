import {
  Request,
  Response,
  NextFunction,
  static as staticServe,
} from 'express';
import { dirname, join } from 'path';
import Product from '../models/product';
import { createTransport } from 'nodemailer';
import pool from '../util/dbconfig';
import bcrypt from 'bcrypt';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';

//LOCAL MODULES
import { mainAppMail } from '../util/pathHelper';

//getting shop products or Login if not authenticated
export function getHomePage(req: Request, res: Response) {
 /*  if (req.isAuthenticated()) { 
     return  res.redirect('/products');
 }  */
    res.redirect('/login');
}

//getting shop products
export function getShopProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /* if (req.isAuthenticated()) { */
    Product.fetchAll((products: any) => {
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
export function downloadFile(req: Request, res: Response) {
  let file = req.body.filename;
  const thePath = join(
    require.main!.filename,
    '../',
    '../',
    'public',
    'uploads',file
  );
  console.log(thePath)
  if(thePath.endsWith('.pdf')){
    return res.sendFile(thePath) 
  }else{
    return res.download(thePath)
  }
 
} 


//mailing the file controller
//INVOKE NODEMAILER AND TRANSPORTER
export const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: mainAppMail.email,
    pass: mainAppMail.password,
  },
});

export function sendMail(req: Request, res: Response) {
  const file = req.body.mailfilepath;
  const savePath = join(__dirname, '../', '../', 'public', 'uploads');
  transporter.sendMail(
    {
      from: 'Liz Delivery <' + mainAppMail.email + '>',
      to: req.body.email,
      subject: req.body.subject,
      html: `<p> ${req.body.note}</p>`,

      attachments: [
        {
          filename: file,
          path: join(savePath, file),
        },
      ],
    },
    (err, info) => {
      if (err) {
        throw err;
      } else {
        res.json({ status: info.response });
      }
    }
  );
  res.redirect('/products');
}

// Logging out CTLer
export function loggingOut(req: Request, res: Response) {
  req.logOut((err: any) => {
    if (err) {
      console.error(err);
    }
    req.flash('success_msg', 'You have logged out');
    res.redirect('/login');
  });
}

export async function userValidation(req: Request, res: Response) {
  let { name, email, password, password2 } = req.body;

  let errors: Array<object> = [];
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
  } else {
    //When Form validation passes
    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err: any, results: any) => {
        if (err) {
          throw err;
        }
        if (results.rows.length > 0) {
          errors.push({ message: 'Email already registered' });
          res.render('loginNregister/register', { errors });
        } else {
          pool.query(
            `INSERT INTO users (name,email,password)
                VALUES ($1,$2,$3)
                RETURNING id,password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              req.flash('success_msg', 'You are now registered, please login');
              res.redirect('/login');
            }
          );
        }
      }
    );
  }
}
