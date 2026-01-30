import express from 'express';
import { login, me, changePassword } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';

const router = express.Router();

router.post('/login', validate(schemas.login), login);
router.get('/me', authMiddleware, me);
router.post('/change-password', authMiddleware, changePassword);

export default router;
