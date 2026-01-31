import express from 'express';
import * as protocolsController from '../controllers/protocols.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all protocols
router.get('/', authMiddleware, protocolsController.getAllProtocols);

// Get protocol by ID
router.get('/:id', authMiddleware, protocolsController.getProtocolById);

// Generate action series from protocol
router.post('/:id/generate', authMiddleware, protocolsController.generateActionSeries);

// Get series by ID
router.get('/series/:id', authMiddleware, protocolsController.getSeriesById);

// Update series schedule
router.put('/series/:id', authMiddleware, protocolsController.updateSeriesSchedule);

// Skip action in series
router.post('/series/:seriesId/skip/:actionId', authMiddleware, protocolsController.skipActionInSeries);

export default router;
