import express from 'express';
import { newGroupController } from '../controllers/new-group';
import { indexParticipantController } from '../controllers/index-participant';
import { indexGroupController } from '../controllers/index-group';
import { newParticipantController } from '../controllers/new-participant';
import { body } from 'express-validator';
import { validateRequest } from '@ey-chat/common';

const router = express.Router();

router.post(
  '/api/groups',
  [body('name').notEmpty().withMessage('Must include a name')],
  validateRequest,
  newGroupController
);

router.get('/api/participants/groups', indexParticipantController);

router.post(
  '/api/participants',
  [
    body('userId').notEmpty().withMessage('Must include a user'),
    body('groupId').notEmpty().withMessage('Must include a group'),
  ],
  validateRequest,
  newParticipantController
);

router.get('/api/groups/:groupId/participants', indexGroupController);

export default router;
