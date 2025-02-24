import { MiddlewareHandler } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from 'hono/adapter';
import { EnvVariables } from '../types/envTypes';

let prisma: PrismaClient | null = null;

const prismaMiddleware: MiddlewareHandler = async (c, next) => {
    const envVariable = env<EnvVariables>(c);
    if (!envVariable.DATABASE_URL) {
        return c.json({ error: 'DATABASE_URL is not defined' }, 500);
    }

    // Initialize Prisma only once and reuse the instance
    if (!prisma) {
        try {
            const basePrisma = new PrismaClient({
                datasources: {
                    db: {
                        url: envVariable.DATABASE_URL
                    }
                }
            });
            prisma = basePrisma.$extends(withAccelerate()) as unknown as PrismaClient;
        } catch (error: any) {
            return c.json({ error: `Error initializing Prisma client: ${error.message}` }, 500);
        }
    }

    c.set('prisma', prisma); 
    c.set('envVariable', envVariable);

    await next(); 
};

export default prismaMiddleware;