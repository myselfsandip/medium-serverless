import { MiddlewareHandler } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { env } from 'hono/adapter';
import { EnvVariables } from '../types/envTypes';



const prismaMiddleware: MiddlewareHandler = async (c, next) => {
    const envVariable = env<EnvVariables>(c);
    if (!envVariable.DATABASE_URL) {
        return c.json({ error: 'DATABASE_URL is not defined' }, 500);
    }

    // Initialize Prisma with the database URL from environment variables
    const prisma = new PrismaClient({
        datasourceUrl: envVariable.DATABASE_URL
    }).$extends(withAccelerate());

    c.set('prisma', prisma); // Store Prisma instance in context
    c.set('envVariable',envVariable);

    await next(); // Continue to the next middleware or route
};

export default prismaMiddleware;
