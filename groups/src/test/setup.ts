import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('../kafka-wrapper');

declare global {
  namespace NodeJS {
    interface Global {
      signup(setup?: { userId?: string; username?: string }): string;
    }
  }
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'ahhh';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) await collection.deleteMany({});
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = (setup) => {
  const payload = {
    id: setup?.userId || new mongoose.Types.ObjectId().toHexString(),
    username: setup?.username || 'test',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  return `Beaer ${token}`;
};
