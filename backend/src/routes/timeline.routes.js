import express from 'express';
import {
  getTimeline,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/timeline.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:patientId', getTimeline);
router.post('/:patientId/events', validate(schemas.createTimelineEvent), createEvent);
router.get('/events/:eventId', getEvent);
router.put('/events/:eventId', updateEvent);
router.delete('/events/:eventId', deleteEvent);

export default router;
