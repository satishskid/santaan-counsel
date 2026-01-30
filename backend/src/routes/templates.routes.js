import express from 'express';
import {
  getTemplatesByEventType,
  renderTemplate,
  getAllTemplates,
  createTemplate,
  updateTemplate,
} from '../controllers/templates.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Apply authentication to all routes
router.use(authMiddleware);

// Get templates by event type (for suggestions)
router.get('/', getTemplatesByEventType);

// Get all templates
router.get('/all', getAllTemplates);

// Render template with patient data
router.post('/render', renderTemplate);

// Create new template
router.post('/', createTemplate);

// Update template
router.put('/:id', updateTemplate);

export default router;
