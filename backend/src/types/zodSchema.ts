import zod from "zod";

export const signUpSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

export type signUpInputs = zod.infer<typeof signUpSchema>;

export const loginSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

export type loginInputs = zod.infer<typeof loginSchema>;

export const createBlogSchema = zod.object({
    title : zod.string(),
    content : zod.string(),
    published : zod.string()
})

export type createBlogInputs = zod.infer<typeof createBlogSchema>;

export const updateBlogSchema = zod.object({
    id: zod.string().uuid(),
    title : zod.string(),
    content : zod.string(),
    published : zod.string()
})

export type updateBlogInputs = zod.infer<typeof updateBlogSchema>;