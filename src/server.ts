import express, { Express, Request, Response } from 'express';
import { setupSwagger } from './config/swagger';
import { setupLogger } from './config/logger';
import compression from 'compression';
import { handle } from 'i18next-http-middleware';
import i18next from './config/i18n';
import registerRouter from './router';
import { corps } from './middleware/corps';

function createServer() {

    // Create express server
  const app: Express = express();

    // use compression to compress all request and response
    app.use(compression());
    app.use(express.urlencoded({ extended: true }));

    // accept corps request
    app.use(corps);

    
    app.use(express.json());

    // handle i18n for internationalization
    app.use(handle(i18next));

    // setup swagger for api documentation
    setupSwagger(app);

    // setup custom app logger
    setupLogger(app);

    // register the app routers
    registerRouter(app);

    return app;
}

export default createServer;
