"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginCtrl_1 = require("../controllers/loginCtrl");
const router = express_1.default.Router();
//REGISTER ROUTE 
router.get('/register', loginCtrl_1.getRegisterPage);
//LOGIN ROUTE 
router.get('/login', loginCtrl_1.getLoginPage);
//FORGOT PASSWORD ROUTE
router.get('/forgot-password', loginCtrl_1.getForgotPassword);
router.post('/forgot-password', loginCtrl_1.postForgotPassword);
//RESET PASSWORD
router.get('/reset-password/:id/:token', loginCtrl_1.getResetPassword);
router.post('/reset-password/:id/:token', loginCtrl_1.postResetPassword);
/* router.get('/reset',getLoginPage) */
exports.default = router;
