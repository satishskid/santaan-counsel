import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { config } from '../config/env.js';

export const login = async (req, res, next) => {
  try {
    const { username, clinicDomain, password } = req.body;
    
    // Find clinic
    const clinic = await prisma.clinic.findUnique({
      where: { domain: clinicDomain },
    });
    
    if (!clinic) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: {
        clinicId_username: {
          clinicId: clinic.id,
          username: username,
        },
      },
    });
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
        clinicId: clinic.id,
        clinicDomain: clinic.domain,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.assignedToName,
        clinicName: clinic.name,
        clinicDomain: clinic.domain,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            domain: true,
          },
        },
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.assignedToName,
      email: user.assignedToEmail,
      clinic: user.clinic,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    
    const validPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { passwordHash: hashedPassword },
    });
    
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};
