import { Request, Response, NextFunction } from 'express';
import { Jwt, sign, verify } from 'jsonwebtoken';
import pool from '../util/dbconfig';
import bcrypt from 'bcrypt';

import { transporter } from '../controllers/shopCtrl';
import { mainAppMail } from '../util/pathHelper';
const JWT_SECRET = 'yoursupersecret';

/**
 * 
 * @swagger
 * /login:
    get:
      summary: Get login page
      responses:
        '200':
          description: Login pages
           /fgpassword:
    get:
      summary: Get forgot password page
      responses:
        '200':
          description: Forgot password page
  /forgot-password:
    post:
      summary: Post request to send password reset link
      parameters:
        - in: body
          name: email
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Password reset link has been sent
        '400':
          description: Email is required
 */
export function getLoginPage(req: Request, res: Response) {
  res.render('loginNregister/login');
}

export function getRegisterPage(req: Request, res: Response) {
  res.render('loginNregister/register');
}

export function getForgotPassword(req: Request, res: Response) {
  res.render('loginNregister/fgpassword', {
    pageTitle: 'Forgot Password',
  });
}

///email and id query functions for reseting password
async function checkEmailExists(email: any) {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length > 0) {
      // Email exists in the database
      const hashedPassword = result.rows[0].password;
      const userId = result.rows[0].id;
      const userEmail = result.rows[0].email;
      // return user details
      return { userId, hashedPassword, userEmail };
    } else {
      // Email does not exist in the database
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}
async function checkIdExists(id: any) {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      // Id exists in the database
      const hashedPassword = result.rows[0].password;
      const userId = result.rows[0].id;
      const userEmail = result.rows[0].email;
      //return user details
      return { userId, hashedPassword, userEmail };
    } else {
      // Id does not exist in the database
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function postForgotPassword(req: Request, res: Response) {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ error: 'Email is required' });
  }

  const userDetails = await checkEmailExists(email);

  if (userDetails) {
    // If the email exists, creating a one-time link
    const secret = JWT_SECRET + userDetails.hashedPassword;
    const payload = {
      email: email,
      id: userDetails.userId,
    };

    const token = sign(payload, secret, { expiresIn: '15m' });
    const link = `http://localhost:3000/reset-password/${userDetails.userId}/${token}`;
    console.log(link);
    transporter.sendMail(
      {
        from: 'Liz Delivery <' + mainAppMail.email + '>',
        to: email,
        subject: 'Your Password Reset Link',
        html: `<p> ${link}</p>`,
      },
      (err, info) => {
        if (err) {
          throw err;
        } else {
          res.json({ status: info.response });
        }
      }
    );
    res.send('Password reset link has been sent..');
  } else {
    // If the email does not exist, send a response indicating failure
    res.send({ message: 'Email does not exist' });
  }
}

export async function getResetPassword(req: Request, res: Response) {
  const { id, token } = req.params;
  const userExists = await checkIdExists(id);

  if (!userExists) {
    return res.status(400).send({ error: 'user doesnt Exist' });
  } else {
    const secret = JWT_SECRET + userExists.hashedPassword;

    try {
      const payload = verify(token, secret);
      res.render('loginNregister/resetpassword', {
        email: userExists.userEmail,
        pageTitle: 'Password Reset',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export async function postResetPassword(req: Request, res: Response) {
  const { id, token } = req.params;
  const { password, password2 } = req.body;
  const userExists = await checkIdExists(id);
  if (!userExists) {
    return res.status(400).json({ error: 'Invalid Id' });
  } else {
    const secret = JWT_SECRET + userExists.hashedPassword;
    try {
      verify(token, secret);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    if (password !== password2) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatePasswordQuery = `UPDATE users SET password = $1 WHERE id = $2`;
    await pool.query(updatePasswordQuery, [hashedPassword, id]);
    return res.render('loginNregister/reset', {
      pageTitle: 'Done Reseting',
      email: userExists.userEmail,
    });
  }
}
