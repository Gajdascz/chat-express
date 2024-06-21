// Base
import mongoose from 'mongoose';

// Utils
import { getDebug } from '../../utils/helpers.js';
import { SUCCESS, FAIL } from '../../utils/constants.js';

const debug = getDebug('db');

mongoose.set('strictPopulate', false);

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    debug(`Connecting to MongoDB: ${SUCCESS}`);
  } catch (err) {
    debug(`Connecting to MongoDB: ${FAIL}`);
  }
};

export { mongoConnect };
