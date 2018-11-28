import mongoose from 'mongoose';
import bluebird from 'bluebird';
import logger from './util/logger';
import { MONGODB_URI } from './util/secrets';
// tslint:disable-next-line:no-any
(mongoose as any).Promise = bluebird;
const dbConnection = mongoose
.connect(MONGODB_URI, {useMongoClient: true})
.then(() => {
  logger.info('Succesfully Connected!');
  // ready to use. The `mongoose.connect()` promise resolves to undefined.
}).catch((err) => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  process.exit();
});

export default function createConnection() {
  return dbConnection;
}
