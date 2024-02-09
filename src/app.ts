import dotenv from 'dotenv';
import { connectDb } from './config/db';
import Logging from './library/logging';
import createServer from './server';

// import { patientAppointmentRouter } from "./routes/patientAppointmentRouter";

dotenv.config();

const app = createServer();

const port = process.env.PORT;
try {
  connectDb().then(() => {
    app.listen(port, () => {
      Logging.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  });
} catch (error) {
  Logging.error('unable to connect to db');
  Logging.error(error);
}
