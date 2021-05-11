import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/router';
import { errorHandler, NotFoundError } from '@ey-chat/common';

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());

app.use(router);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
