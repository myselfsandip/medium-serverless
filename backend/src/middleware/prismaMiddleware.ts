import { MiddlewareHandler } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaMiddleware: MiddlewareHandler = async (c, next) => {
    if (!c.env.DATABASE_URL) {
        return c.json({ error: 'DATABASE_URL is not defined' }, 500);
    }

    // Initialize Prisma with the database URL from environment variables
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    c.set('prisma', prisma); // Store Prisma instance in context

    await next(); // Continue to the next middleware or route
};

export default prismaMiddleware;
