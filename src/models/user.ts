import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  name: string;
  surname: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    accessTokens: IAccessToken[];
  };
}

export interface IUserModel extends IUser, Document {}

export interface IDevice {
  name: string;
  deviceId: string;
}
interface IAccessToken {
  device: IDevice;
  value: string;
  abilities: string[];
  expiredAt: Date;
}
const deviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    deviceId: {
      type: String,
      required: true
    }
  },
  { _id: false }
);
const accessTokenSchema = new Schema(
  {
    device: deviceSchema,
    value: {
      type: String,
      required: true,
      select: false
    },
    abilities: {
      type: [String],
      select: false
    },
    expiredAt: {
      type: Date,
      select: false
    }
  },
  { timestamps: true }
);

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    surname: String,
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      accessTokens: [accessTokenSchema]
    }
  },
  { timestamps: true }
);
const UserModel = mongoose.model<IUserModel>('User', userSchema);

export default UserModel;
