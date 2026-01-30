// Netlify Function to run database migrations
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

export const handler = async (event, context) => {
  try {
    // Run migrations
    console.log('Running database migrations...');
    execSync('npx prisma migrate deploy', { 
      cwd: process.cwd(),
      stdio: 'inherit'
    });

    // Run seed
    console.log('Seeding database...');
    execSync('npx prisma db seed', {
      cwd: process.cwd(),
      stdio: 'inherit'
    });

    // Test connection
    await prisma.$connect();
    const count = await prisma.patient.count();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Database initialized successfully',
        patientCount: count,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Migration error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  } finally {
    await prisma.$disconnect();
  }
};
