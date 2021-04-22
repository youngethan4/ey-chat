import { validateRequest } from '@ey-chat/common';
import express from 'express';
import { body } from 'express-validator';
import { indexController } from '../controllers';
import newController from '../controllers/new';

const router = express.Router();
const strMsg = 'must be of type string';

router.post(
  '/api/messages',
  [
    body('groupId').notEmpty().isString().withMessage(`groupId ${strMsg}`),
    body('sender').notEmpty().isString().withMessage(`sender ${strMsg}`),
    body('payload').notEmpty().isString().withMessage(`payload ${strMsg}`),
  ],
  validateRequest,
  newController
);

router.get('/api/messages/:groupId', indexController);

export default router;
