import express from 'express';
import 'express-async-errors';
import {
  currentUser,
  errorHandler,
  NotFoundError,
  requireAuth,
} from '@ey-chat/common';
import router from './routes/router';
const app = express();

app.set('trust-proxy', true);
app.use(express.json());

app.use(currentUser, requireAuth, router);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
