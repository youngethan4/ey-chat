import express from 'express';
import { newGroupController } from '../controllers/new-group';
import { indexParticipantController } from '../controllers/index-participant';
import { indexGroupController } from '../controllers/index-group';
import { newParticipantController } from '../controllers/new-participant';
import { body } from 'express-validator';
import { validateRequest } from '@ey-chat/common';
import { deleteGroup } from '../controllers/delete-group';

const router = express.Router();

router.post(
  '/api/groups',
  [body('name').notEmpty().withMessage('Must include a name')],
  validateRequest,
  newGroupController
);

router.get('/api/participants/groups', indexParticipantController);

router.post(
  '/api/groups/:groupId/participants',
  [body('username').notEmpty().withMessage('Must include a user')],
  validateRequest,
  newParticipantController
);

router.get('/api/groups/:groupId/participants', indexGroupController);

router.delete('/api/groups/:groupId', deleteGroup);

export default router;
