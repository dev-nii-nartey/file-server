//GLOBAL MODULES
import express from 'express';
import { Express, Application, static as staticServe } from 'express';
import { join } from 'path';
import { urlencoded } from 'body-parser';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
/* import pgSession from 'connect-pg-simple'; */
const pgSession = require('connect-pg-simple')(session);
import pool from './util/dbconfig'; // Import the pool from your dbconfig file

//LOCAL MODULES
import loginRegisterRoutes from './routes/loginRoute';
import adminRoutes from './routes/adminRoute';
import shopRoutes from './routes/shopRoute';
import initializePassport from './util/passportConfig';
import swaggerDocs from './util/swagger';

const PORT = 3000;
const app: Express = express();

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str, newStr:any){
    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }
    // If a string
    return this.replace(new RegExp(str, 'g'), newStr);
  };
}


//SETTING UP VIEW ENGINE TO EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

//SET STATIC EXPRESS
app.use(staticServe(join(__dirname, '../', 'public')));

// Enable CORS for all routes
app.use(cors());

//SET BODY PARSER LIBRARY
app.use(urlencoded({ extended: false }));
app.use(express.json());

// Use connect-pg-simple for session store
app.use(session({
  store: new pgSession({
      pool: pool,   
      tableName: 'session',
      escapePgIdentifier: (value:any) => value.replace(/"/g, '""')    
  }),
  secret: process.env.SESSION_SECRET || 'your secret',  
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
}));

//FLASH
app.use(flash());

//PASSPORT INITIALIZING
initializePassport(passport);

app.use(passport.session());
app.use(passport.initialize());

//INVOKE FILEUPLOAD
app.use(fileUpload());

//LOGIN and/or REGISTER ROUTE
app.use(loginRegisterRoutes);

//ADMIN PRODUCTS PAGE
app.use('/admin', adminRoutes);

//SHOP PRODUCTS PAGE
app.use(shopRoutes);

//SWAGGER UI AND JSDOC
swaggerDocs(app, PORT);

export default app;

app.listen(process.env.PORT || PORT);