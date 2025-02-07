import { Context } from "hono";
import { PrismaClient } from "@prisma/client";

// type CustomContext = Context<{ Variables: { prisma: PrismaClient } }>;

export const signup = async (c: Context) => {
    const prisma = c.get("prisma") as PrismaClient;

    const body = await c.req.json();

    await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password
        }
    })
};

export const login = async (c: Context) => {
    //
};
