import express from 'express';
import {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  getPatientTimeline,
} from '../controllers/patients.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getPatients);
router.post('/', validate(schemas.createPatient), createPatient);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.get('/:id/timeline', getPatientTimeline);

export default router;
