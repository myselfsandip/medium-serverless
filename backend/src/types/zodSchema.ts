import zod from "zod";

export const signUpSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

export const loginSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

export const createBlogSchema = zod.object({
    title : zod.string(),
    content : zod.string(),
    published : zod.string()
})