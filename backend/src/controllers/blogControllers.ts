import { PrismaClient } from "@prisma/client";
import { Context } from "hono";
import { createBlogInputs, createBlogSchema, updateBlogInputs, updateBlogSchema } from "@myselfsandip07/medium-common";
import sendResponse from "../utils/sendResponse";

export const createBlog = async (c: Context) => {
    try {
        const prisma = c.get('prisma') as PrismaClient;
        const userId: number = c.get('userId');

        const body: createBlogInputs = await c.req.json();
        if (isNaN(userId)) {
            return sendResponse(c, 400, false, "Invalid user ID");
        }

        const parsedPayload = createBlogSchema.safeParse(body);
        if (!parsedPayload.success) {
            return sendResponse(c, 400, false, JSON.stringify(parsedPayload.error.format()));
        }

        const blogPost = await prisma.blog.create({
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

        const { id, title, content, published } = parsedPayload.data;
        const existingBlog = await prisma.blog.findUnique({
            where: { id: id }
        });
        if (!existingBlog) {
            return sendResponse(c, 404, false, "Blog Not Found!");
        }
        const updatedBlog = await prisma.blog.update({
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
        const blogId = c.req.query('id');
        const blog = await prisma.blog.findUnique({
            where: { id: parseInt(blogId as string, 10) }
        });
        if (!blog) {
            return sendResponse(c, 404, false, "Blog Not Found!");
        }
        return sendResponse(c, 201, true, "Blog Found Successfully", blog);
    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
};

export const getAllBlogs = async (c: Context) => {
    try {
        const prisma = c.get('prisma') as PrismaClient;
        const blogs = await prisma.blog.findMany();
        return sendResponse(c, 201, true, "All Blogs Fetched Successfully", blogs);
    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
};