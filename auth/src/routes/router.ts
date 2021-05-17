import { currentUser, requireAuth, validateRequest } from '@ey-chat/common';
import express from 'express';
import { body } from 'express-validator';
import { signupController } from '../controllers/signup';
import { signinController } from '../controllers/signin';
import { currentUserController } from '../controllers/current-user';
import { searchUsersController } from '../controllers/search-users';

const router = express.Router();

const usernamePasswordValidator = [
  body('username')
    .notEmpty()
    .isAlphanumeric()
    .trim()
    .withMessage('Username must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters.'),
];

router.post(
  '/api/users/signup',
  usernamePasswordValidator,
  validateRequest,
  signupController
);

router.post(
  '/api/users/signin',
  usernamePasswordValidator,
  validateRequest,
  signinController
);

router.get('/api/users/currentuser', currentUser, currentUserController);

router.get('/api/users', currentUser, requireAuth, searchUsersController);

export default router;
