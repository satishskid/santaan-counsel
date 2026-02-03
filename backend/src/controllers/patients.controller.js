import prisma from '../config/database.js';

export const getPatients = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    const where = {
      clinicId: req.user.clinicId,
    };
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { mrNumber: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }
    
    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        include: {
          cycles: {
            where: { status: 'active' },
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: { timelineEvents: true },
          },
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.patient.count({ where }),
    ]);
    
    res.json({
      data: patients,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const patient = await prisma.patient.findFirst({
      where: {
        id,
        clinicId: req.user.clinicId,
      },
      include: {
        cycles: {
          orderBy: { createdAt: 'desc' },
        },
        timelineEvents: {
          take: 5,
          orderBy: { eventDate: 'desc' },
          include: {
            creator: {
              select: {
                id: true,
                assignedToName: true,
                role: true,
              },
            },
          },
        },
      },
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    next(error);
  }
};

export const createPatient = async (req, res, next) => {
  try {
    const data = req.body;
    
    // Generate MR number
    const year = new Date().getFullYear();
    const count = await prisma.patient.count({
      where: { clinicId: req.user.clinicId },
    });
    const mrNumber = `SAN-${year}-${String(count + 1).padStart(4, '0')}`;
    
    const patient = await prisma.patient.create({
      data: {
        ...data,
        clinicId: req.user.clinicId,
        mrNumber,
      },
    });
    
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const patient = await prisma.patient.updateMany({
      where: {
        id,
        clinicId: req.user.clinicId,
      },
      data,
    });
    
    if (patient.count === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    const updated = await prisma.patient.findUnique({ where: { id } });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getPatientTimeline = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cycleId, eventType, limit = 50 } = req.query;
    
    const where = {
      patientId: id,
    };
    
    if (cycleId) {
      where.cycleId = cycleId;
    }
    
    if (eventType) {
      where.eventType = eventType;
    }
    
    const events = await prisma.timelineEvent.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            assignedToName: true,
            role: true,
          },
        },
        cycle: {
          select: {
            id: true,
            cycleNumber: true,
            protocol: true,
          },
        },
      },
      orderBy: { eventDate: 'desc' },
      take: parseInt(limit),
    });
    
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// Search patients (active only for autocomplete)
export const searchPatients = async (req, res, next) => {
  try {
    const { q, activeOnly = 'false' } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }
    
    const where = {
      clinicId: req.user.clinicId,
      OR: [
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName: { contains: q, mode: 'insensitive' } },
        { mrNumber: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q } },
      ],
    };
    
    // Filter active patients only
    if (activeOnly === 'true') {
      where.cycles = {
        some: { status: 'active' },
      };
    }
    
    const patients = await prisma.patient.findMany({
      where,
      include: {
        cycles: {
          where: { status: 'active' },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
        timelineEvents: {
          take: 1,
          orderBy: { eventDate: 'desc' },
          select: {
            eventType: true,
            eventDate: true,
          },
        },
        actions: {
          where: { status: 'pending' },
          select: { id: true },
        },
      },
      take: 10,
      orderBy: { updatedAt: 'desc' },
    });
    
    res.json(patients);
  } catch (error) {
    next(error);
  }
};

// Quick walk-in registration
export const createWalkin = async (req, res, next) => {
  try {
    const { firstName, lastName, age, phone, email, reason } = req.body;
    
    // Generate MR number
    const lastPatient = await prisma.patient.findFirst({
      where: { clinicId: req.user.clinicId },
      orderBy: { mrNumber: 'desc' },
    });
    
    const lastNumber = lastPatient?.mrNumber ? parseInt(lastPatient.mrNumber.replace(/\D/g, '')) : 0;
    const mrNumber = `MR${String(lastNumber + 1).padStart(5, '0')}`;
    
    // Create patient
    const patient = await prisma.patient.create({
      data: {
        clinicId: req.user.clinicId,
        mrNumber,
        firstName,
        lastName,
        age: parseInt(age),
        phone,
        email,
      },
    });
    
    // Create active cycle
    const cycle = await prisma.treatmentCycle.create({
      data: {
        patientId: patient.id,
        cycleNumber: 1,
        startDate: new Date(),
        status: 'active',
        isActive: true,
      },
    });
    
    // Create first timeline event
    await prisma.timelineEvent.create({
      data: {
        patientId: patient.id,
        cycleId: cycle.id,
        eventType: reason || 'initial_consultation',
        eventDate: new Date(),
        creatorId: req.user.id,
        staffRole: req.user.role,
        summaryText: `Walk-in patient registered - ${reason || 'initial consultation'}`,
      },
    });
    
    res.status(201).json({ patient, cycle });
  } catch (error) {
    next(error);
  }
};
