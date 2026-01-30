// Netlify Function Adapter for Express Backend
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Import route handlers
import authRoutes from '../../backend/src/routes/auth.routes.js';
import patientsRoutes from '../../backend/src/routes/patients.routes.js';
import timelineRoutes from '../../backend/src/routes/timeline.routes.js';
import acronymsRoutes from '../../backend/src/routes/acronyms.routes.js';
import templatesRoutes from '../../backend/src/routes/templates.routes.js';

// Initialize Prisma
const prisma = new PrismaClient();

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: '*' })); // Netlify handles CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: 'netlify-functions'
  });
});

// API Routes (remove /api prefix as Netlify redirects handle it)
app.use('/auth', authRoutes);
app.use('/patients', patientsRoutes);
app.use('/timeline', timelineRoutes);
app.use('/acronyms', acronymsRoutes);
app.use('/templates', templatesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Function error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Export serverless handler
export const handler = serverless(app);
