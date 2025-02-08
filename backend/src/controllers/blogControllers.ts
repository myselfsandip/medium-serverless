import { PrismaClient } from "@prisma/client";
import { Context } from "hono";
import { EnvVariables } from "../types/envTypes";
import { createBlogInputs, createBlogSchema, updateBlogInputs, updateBlogSchema } from "../types/zodSchema";
import sendResponse from "../utils/sendResponse";

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
        const body: updateBlogInputs = await c.req.json();
        const parsedPayload = updateBlogSchema.safeParse(body);
        if (!parsedPayload.success) {
            return sendResponse(c, 400, false, JSON.stringify(parsedPayload.error.format()));
        }
        //Get the Blog ID & Find that in DB
        //Update That with the New Values
        //Return Success
        const { id, title, content, published } = parsedPayload.data;
        const existingBlog = await prisma.post.findUnique({
            where: { id: id }
        });
        if (!existingBlog) {
            return sendResponse(c, 404, false, "Blog Not Found!");
        }
        const updatedBlog = await prisma.post.update({
            where: { id: id },
            data: { title, content, published }
        });
        return sendResponse(c, 200, true, "Blog updated successfully", updatedBlog);
    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
};
export const getBlogs = async (c: Context) => {
    try {
        const prisma = c.get('prisma') as PrismaClient;
        //Take the blog ID from the query pareameter 
        //Find that in DB
        //Return Success with the Blog in data
        const blogId: string = c.req.query('id') as string;
        const blog = await prisma.post.findUnique({
            where: { id: blogId }
        });
        if (!blog) {
            return sendResponse(c, 404, false, "Blog Not Found!");
        }
        return sendResponse(c, 201, true, "Blog Found Successfully", blog);
    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
};
