import prisma from '../config/database.js';
import { PROTOCOLS } from '../config/protocols.js';

// Get all protocols
const getAllProtocols = async (req, res) => {
  try {
    const protocols = await prisma.protocol.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    
    res.json(protocols);
  } catch (error) {
    console.error('Error fetching protocols:', error);
    res.status(500).json({ error: 'Failed to fetch protocols' });
  }
};

// Get protocol by ID
const getProtocolById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const protocol = await prisma.protocol.findUnique({
      where: { id }
    });
    
    if (!protocol) {
      return res.status(404).json({ error: 'Protocol not found' });
    }
    
    res.json(protocol);
  } catch (error) {
    console.error('Error fetching protocol:', error);
    res.status(500).json({ error: 'Failed to fetch protocol' });
  }
};

// Generate action series from protocol
const generateActionSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, eventId, startDate, customSchedule } = req.body;
    
    // Get protocol
    const protocol = await prisma.protocol.findUnique({
      where: { id }
    });
    
    if (!protocol) {
      return res.status(404).json({ error: 'Protocol not found' });
    }
    
    // Calculate end date
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + protocol.duration);
    
    // Use custom schedule or original
    const schedule = customSchedule || protocol.schedule;
    
    // Create series
    const series = await prisma.actionSeries.create({
      data: {
        patientId,
        protocolId: id,
        eventId,
        startDate: start,
        endDate: end,
        originalSchedule: protocol.schedule,
        currentSchedule: schedule,
        totalActions: countActionsInSchedule(schedule),
        completedActions: 0,
        status: 'active'
      }
    });
    
    // Generate all actions
    const actions = [];
    for (const day of schedule) {
      const dayDate = new Date(start);
      dayDate.setDate(dayDate.getDate() + (day.day - 1));
      
      for (const event of day.events) {
        for (const action of event.actions || []) {
          const actionDate = new Date(dayDate);
          
          // Handle relative day (e.g., call day before scan)
          if (action.relativeDay) {
            actionDate.setDate(actionDate.getDate() + action.relativeDay);
          }
          
          // Set time
          const [hours, minutes] = action.time.split(':');
          actionDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          actions.push({
            patientId,
            actionType: action.actionType,
            priority: action.priority || 'normal',
            eventId,
            seriesId: series.id,
            seriesDay: day.day,
            scheduledFor: actionDate,
            dueAt: actionDate,
            actionLocation: action.location || 'remote',
            actionIcon: action.icon || '📋',
            status: 'pending'
          });
        }
      }
    }
    
    // Bulk create actions
    await prisma.actionQueue.createMany({
      data: actions
    });
    
    res.json({
      series,
      actionsGenerated: actions.length
    });
  } catch (error) {
    console.error('Error generating action series:', error);
    res.status(500).json({ error: 'Failed to generate action series' });
  }
};

// Get series by ID
const getSeriesById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const series = await prisma.actionSeries.findUnique({
      where: { id },
      include: {
        protocol: true,
        patient: true,
        actions: {
          orderBy: { scheduledFor: 'asc' }
        }
      }
    });
    
    if (!series) {
      return res.status(404).json({ error: 'Series not found' });
    }
    
    res.json(series);
  } catch (error) {
    console.error('Error fetching series:', error);
    res.status(500).json({ error: 'Failed to fetch series' });
  }
};

// Update series schedule
const updateSeriesSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentSchedule, editNote } = req.body;
    
    const series = await prisma.actionSeries.findUnique({
      where: { id }
    });
    
    if (!series) {
      return res.status(404).json({ error: 'Series not found' });
    }
    
    // Track edit
    const edits = series.edits || [];
    edits.push({
      timestamp: new Date(),
      note: editNote,
      changedFrom: series.currentSchedule,
      changedTo: currentSchedule
    });
    
    // Update series
    const updated = await prisma.actionSeries.update({
      where: { id },
      data: {
        currentSchedule,
        edits,
        updatedAt: new Date()
      }
    });
    
    // TODO: Regenerate pending actions based on new schedule
    
    res.json(updated);
  } catch (error) {
    console.error('Error updating series:', error);
    res.status(500).json({ error: 'Failed to update series' });
  }
};

// Skip action in series
const skipActionInSeries = async (req, res) => {
  try {
    const { seriesId, actionId } = req.params;
    const { reason } = req.body;
    
    const action = await prisma.actionQueue.update({
      where: { id: actionId },
      data: {
        isSkipped: true,
        skipReason: reason,
        status: 'skipped'
      }
    });
    
    res.json(action);
  } catch (error) {
    console.error('Error skipping action:', error);
    res.status(500).json({ error: 'Failed to skip action' });
  }
};

// Helper: Count actions in schedule
function countActionsInSchedule(schedule) {
  let count = 0;
  for (const day of schedule) {
    for (const event of day.events) {
      count += (event.actions || []).length;
    }
  }
  return count;
}

export {
  getAllProtocols,
  getProtocolById,
  generateActionSeries,
  getSeriesById,
  updateSeriesSchedule,
  skipActionInSeries
};
