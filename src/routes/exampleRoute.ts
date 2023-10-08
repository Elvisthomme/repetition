import { Router } from 'express';
import { index, show, store, put } from '../controllers/exampleController';
import validationMiddleWare from '../middleware/exampleMiddleware';
import validator from '../validators/exampleValidator';

const exampleRouter = Router();
const endPoint = `/example`;

exampleRouter.get(endPoint, index);

exampleRouter.get(
  `${endPoint}/:id`,
  validator.checkDeleteAndGetById(),
  validationMiddleWare.handleValidationError,
  show,
);

exampleRouter.post(
  endPoint,
  validator.checkCreatePatientAppointment(),
  validationMiddleWare.handleValidationError,
  store,
);

exampleRouter.put(
  `${endPoint}/:id`,
  validator.checkUpdatePatientAppointment(),
  validationMiddleWare.handleValidationError,
  put,
);

export default exampleRouter;
