import prisma from '../config/database.js';
import { expandAcronyms } from '../services/acronymExpander.service.js';

export const getTimeline = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    
    const events = await prisma.timelineEvent.findMany({
      where: { patientId },
      include: {
        creator: {
          select: {
            assignedToName: true,
            role: true,
          },
        },
        cycle: {
          select: {
            cycleNumber: true,
            protocol: true,
          },
        },
      },
      orderBy: { eventDate: 'desc' },
    });
    
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const data = req.body;
    
    // Verify patient belongs to clinic
    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
        clinicId: req.user.clinicId,
      },
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    // Expand clinical data acronyms
    let patientRecordText = data.summaryText;
    if (data.clinicalData) {
      const expanded = await expandAcronyms(data.clinicalData);
      patientRecordText = expanded;
    }
    
    // Create event
    const event = await prisma.timelineEvent.create({
      data: {
        ...data,
        patientId,
        createdBy: req.user.userId,
        staffRole: req.user.role,
        patientRecordText,
        searchableText: `${data.eventType} ${data.summaryText || ''} ${patientRecordText}`,
      },
      include: {
        creator: {
          select: {
            assignedToName: true,
            role: true,
          },
        },
      },
    });
    
    // Update patient anxiety if reaction data provided
    if (data.reactionData?.anxiety_after) {
      await prisma.patient.update({
        where: { id: patientId },
        data: { currentAnxiety: data.reactionData.anxiety_after },
      });
    }
    
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    
    const event = await prisma.timelineEvent.findUnique({
      where: { id: eventId },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            mrNumber: true,
          },
        },
        creator: {
          select: {
            assignedToName: true,
            role: true,
          },
        },
        cycle: true,
      },
    });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const data = req.body;
    
    const event = await prisma.timelineEvent.update({
      where: { id: eventId },
      data,
    });
    
    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    
    await prisma.timelineEvent.delete({
      where: { id: eventId },
    });
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};
