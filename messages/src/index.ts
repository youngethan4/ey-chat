import mongoose from 'mongoose';
import app from './app';

const port = 3000;

const start = async () => {
  if (!process.env.MONGO_URI)
    throw new Error('Must include mongo uri in env vars');
  if (!process.env.JWT_KEY) throw new Error('Must include jwt key in env vars');
  if (!process.env.KAFKA_HOST)
    throw new Error('Must include kafka host url in enc vars');

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to mongo db');
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log('Messages service listening on port', port);
  });
};

start();
