import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByEmail, getUserById, getUsers } from '../services/user.service';
import { authentication, random } from '../helpers';
import Logging from '../library/logging';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, surname, password, device } = req.body;
    if (!email || !password || !surname || !device?.name || !device?.deviceId) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createUser({
      email,
      name,
      surname,
      authentication: {
        salt,
        password: authentication(salt, password)
      }
    });

    return next();
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, device, abilities } = req.body;
    if (!email || !password || !device?.name || !device?.deviceId) {
      return res.sendStatus(400);
    }
    let user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
    if (!user) {
      res.sendStatus(422);
    }

    const expectedHash = authentication(user!.authentication.salt, password);
    if (user!.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }
    const salt = random();
    let expiredAt = new Date();
    expiredAt.setFullYear(2025);
    const token = authentication(salt, user!._id.toString());
    const existToken: number = user!.authentication.accessTokens.map((e) => e.device.deviceId).indexOf(device.deviceId);

    if (existToken > -1) {
      //This user has already logged in with the current device
      user!.authentication!.accessTokens!.at(existToken)!.device.name = device.name;
      user!.authentication!.accessTokens!.at(existToken)!.value = token;
      user!.authentication!.accessTokens!.at(existToken)!.abilities = abilities;
      user!.authentication!.accessTokens!.at(existToken)!.expiredAt = expiredAt;
    } else {
      user!.authentication.accessTokens.push({
        device: {
          name: device.name,
          deviceId: device.deviceId
        },
        value: token,
        abilities: abilities,
        expiredAt
      });
    }
    user!.markModified('authentication');
    user!.save();
    user = await getUserById(user!._id);
    return res
      .status(user!.isNew ? 201 : 200)
      .json({ token, user })
      .end();
  } catch (error) {
    Logging.error(error);
  }
};
