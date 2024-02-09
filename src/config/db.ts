import mongoose from 'mongoose';
import Logging from '../library/logging';

//This for migration
const connectDb = async () => {
  // https://mongoosejs.com/docs/guide.html#strictQuery
  mongoose.set('strictQuery', false);
  await mongoose
    .connect(process.env.MIGRATE_MONGO_URI!, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
      dbName: process.env.MONGODB_NAME
    })
    .then(() =>  {
      Logging.log('db connected');
    });
};

export { connectDb };
