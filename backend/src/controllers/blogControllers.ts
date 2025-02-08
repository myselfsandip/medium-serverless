import { PrismaClient } from "@prisma/client";
import { Context } from "hono";
import { EnvVariables } from "../types/envTypes";
import { createBlogSchema } from "../types/zodSchema";
import sendResponse from "../utils/sendResponse";
import { createBlogInputs } from "../types/blogTypes";

export const createBlog = async (c: Context) => {
    try {
        const prisma = c.get('prisma') as PrismaClient;
        // const envVariable = c.get('envVariables') as EnvVariables;

        const body: createBlogInputs = await c.req.json();
        const userId = c.req.userId;

        const parsedPayload = createBlogSchema.safeParse(body);
        if (!parsedPayload.success) {
            return sendResponse(c, 400, false, JSON.stringify(parsedPayload.error.format()));
        }

        const blogPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                author: {
                    connect: { id: userId }
                }
            }
        });

        return sendResponse(c, 201, true, "Blog Created Successfully", { data: blogPost });
    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
};

export const updateBlog = async (c: Context) => {
    try {
        const prisma = c.get('prisma') as PrismaClient;
        // const envVariable = c.get('envVariables') as EnvVariables;

        const body: createBlogInputs = await c.req.json();
        const userId = c.req.userId;

        const parsedPayload = createBlogSchema.safeParse(body);
        if (!parsedPayload.success) {
            return sendResponse(c, 400, false, JSON.stringify(parsedPayload.error.format()));
        }

        //Get the Blog ID & Find that in DB
        //Update That with the New Values
        //Return Success
    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
};
export const getBlogs = async (c: Context) => {
    try {
        const prisma = c.get('prisma') as PrismaClient;
        // const envVariable = c.get('envVariables') as EnvVariables;
        const userId = c.req.userId;
        //Take the blog ID from the query pareameter 
        //Find that in DB
        //Return Success with the Blog in data
    } catch (error : any) {
        return sendResponse(c,error.status ?? 500 , false , error.message ?? "Internal Server Error");
    }
};
