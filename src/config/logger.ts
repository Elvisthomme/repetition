import { Express,Request,Response, NextFunction } from 'express';
import Logging from '../library/logging';


export function setupLogger(app: Express) {
    let logId = 0;
    app.use((req: Request, res: Response, next: NextFunction) => {
        /**Log the request */
        const id = ++logId;
        Logging.info(`Incoming requestId: [${id}] -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
          /**Log the response */
          Logging.info(`Sending response requestId: [${id}] -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        })

        next();
    });
}
