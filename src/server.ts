import express, { Express, Request, Response } from 'express';
import { setupSwagger } from './config/swagger';
import dotenv from 'dotenv';
import i18next from './config/i18n';
import { handle } from 'i18next-http-middleware';
import exampleRouter from './routes/exampleRoute';

// import { patientAppointmentRouter } from "./routes/patientAppointmentRouter";

dotenv.config();

const app: Express = express();

const port = process.env.PORT;

app.use(express.json());
app.use(handle(i18next));
// app.use(cors());
// app.get("/", (req: Request, res: Response) => {
//   res.send(
//     "Express + TypeScript Server + Docker " + req.t("hello", { name: "Elvis" }),
//   );
// });

app.use(`/api/${process.env.VERSION}`, exampleRouter);

setupSwagger(app);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
