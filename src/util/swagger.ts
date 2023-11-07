import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express, Request, Response, Application } from 'express';

//SWAGGER UI AND JSDOC
const options: swaggerJSDoc.Options = {
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

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port: number ){
  //SwaggerPage
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //Docs in JSON format
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application.json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;

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
