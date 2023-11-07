import express,{Application,Request,Response,NextFunction} from 'express';

import { getLoginPage,getRegisterPage, getForgotPassword , postForgotPassword, getResetPassword, postResetPassword} from "../controllers/loginCtrl";

const router = express.Router()


//REGISTER ROUTE 
router.get('/register',getRegisterPage)



//LOGIN ROUTE 
router.get('/login',getLoginPage)


//FORGOT PASSWORD ROUTE
router.get('/forgot-password', getForgotPassword)
router.post('/forgot-password', postForgotPassword)


//RESET PASSWORD
router.get('/reset-password/:id/:token', getResetPassword)
router.post('/reset-password/:id/:token', postResetPassword)
/* router.get('/reset',getLoginPage) */



export default router;