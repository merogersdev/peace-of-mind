import { PrismaClient } from '@prisma/client';

import { ENV } from '../env';

// Cut down on Prisma Clients in Development

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (ENV.BACKEND_ENV !== 'PROD') globalForPrisma.prisma = prisma;
