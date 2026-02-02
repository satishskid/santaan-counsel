import prisma from '../config/database.js';

/**
 * Get templates by event type
 */
export const getTemplatesByEventType = async (req, res) => {
  try {
    const { eventType } = req.query;
    
    if (!eventType) {
      return res.status(400).json({ message: 'Event type is required' });
    }

    const templates = await prisma.template.findMany({
      where: {
        eventType,
        isActive: true,
        clinicId: req.user.clinicId,
      },
      orderBy: {
        usageCount: 'desc',
      },
    });

    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Failed to fetch templates' });
  }
};

/**
 * Render template with patient data
 */
export const renderTemplate = async (req, res) => {
  try {
    const { templateId, patientId, customData } = req.body;

    // Fetch template
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Fetch patient data
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        cycles: {
          where: { isActive: true },
          orderBy: { startDate: 'desc' },
          take: 1,
        },
      },
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Build replacement data
    const activeCycle = patient.cycles[0];
    const replacementData = {
      patient_name: patient.name,
      patient_first_name: patient.name.split(' ')[0],
      cycle_number: activeCycle ? activeCycle.cycleNumber : 'N/A',
      cycle_day: activeCycle ? activeCycle.currentDay : 'N/A',
      clinic_name: req.user.clinicName || 'Our Clinic',
      doctor_name: req.user.assignedToName || 'Your Doctor',
      ...customData,
    };

    // Replace placeholders in template
    let renderedText = template.messageTemplate;
    Object.entries(replacementData).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      renderedText = renderedText.replace(placeholder, value);
    });

    // Update usage count
    await prisma.template.update({
      where: { id: templateId },
      data: { usageCount: { increment: 1 } },
    });

    res.json({
      renderedText,
      channel: template.channel,
      language: template.language,
      originalTemplate: template.messageTemplate,
    });
  } catch (error) {
    console.error('Error rendering template:', error);
    res.status(500).json({ message: 'Failed to render template' });
  }
};

/**
 * Get all templates for clinic
 */
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { eventType: 'asc' },
        { timesUsed: 'desc' },
      ],
    });

    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Failed to fetch templates' });
  }
};

/**
 * Create new template
 */
export const createTemplate = async (req, res) => {
  try {
    const { name, eventType, channel, language, messageTemplate } = req.body;

    const template = await prisma.template.create({
      data: {
        name,
        eventType,
        channel,
        language,
        messageTemplate,
        clinicId: req.user.clinicId,
        createdBy: req.user.userId,
        isActive: true,
        usageCount: 0,
      },
    });

    res.status(201).json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ message: 'Failed to create template' });
  }
};

/**
 * Update template
 */
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, messageTemplate, isActive } = req.body;

    const template = await prisma.template.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(messageTemplate && { messageTemplate }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Failed to update template' });
  }
};
