"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
//SWAGGER UI AND JSDOC
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Server Project (Lizzie Delivery)',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/',
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    //SwaggerPage
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    //Docs in JSON format
    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application.json');
        res.send(swaggerSpec);
    });
}
exports.default = swaggerDocs;
// Swagger configuration options
/* const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      description: 'Your API Description',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.ts'],
 
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

 function swaggerDocs(app: Express, port: number,score:any) {
  score()
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}


export default swaggerDocs */
