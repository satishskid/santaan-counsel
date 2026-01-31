import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import patientsRoutes from './routes/patients.routes.js';
import timelineRoutes from './routes/timeline.routes.js';
import acronymsRoutes from './routes/acronyms.routes.js';
import templatesRoutes from './routes/templates.routes.js';
import protocolsRoutes from './routes/protocols.routes.js';

const app = express();

// Middleware
app.use(cors({ origin: config.cors.origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/acronyms', acronymsRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/protocols', protocolsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Santaan Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`🌐 CORS enabled for: ${config.cors.origin}`);
});

export default app;
