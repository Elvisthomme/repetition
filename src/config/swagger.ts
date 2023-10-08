import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDocument from '../../swagger.json';

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['../routes/*'],
  };

  const specs = swaggerJsdoc(options);

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, specs),
  );
}
