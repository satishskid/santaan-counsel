import express from 'express';
import { getAcronyms, expandText } from '../services/acronymExpander.service.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAcronyms);
router.post('/expand', expandText);

export default router;
