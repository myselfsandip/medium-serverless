import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { genarateJwt } from "../utils/JWT_Tokens";
import { EnvVariables } from "../types/envTypes";
import { UserDBInput } from "../types/userTypes";
import { hashPassword, verifyHashedPassword } from "../utils/passwordHashing";
import sendResponse from "../utils/sendResponse";
import { signUpSchema, loginSchema, signUpInputs, loginInputs } from "../types/zodSchema";

export const signup = async (c: Context) => {
    try {
        const prisma = c.get("prisma") as PrismaClient;
        const envVariable = c.get("envVariable") as EnvVariables;

        const body : signUpInputs = await c.req.json();

        const parsedPayload = signUpSchema.safeParse(body);

        if (!parsedPayload.success) {
            return sendResponse(c, 400, false, JSON.stringify(parsedPayload.error.format()));
        }

        const exitstingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });

        if (exitstingUser) {
            return sendResponse(c, 400, false, "User Email Already Exists");
        }

        const hashedPassword = await hashPassword(body.password);

        const user: UserDBInput = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });

        const token = await genarateJwt(user.id, envVariable.JWT_SECRET);

        return sendResponse(c, 201, true, "Signup Successfull", token);

    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
};

export const login = async (c: Context) => {
    try {
        const prisma = c.get("prisma") as PrismaClient;
        const envVariable = c.get("envVariable") as EnvVariables;

        const body : loginInputs = await c.req.json();

        const parsedPayload = loginSchema.safeParse(body);

        if (!parsedPayload.success) {
            sendResponse(c, 400, false, JSON.stringify(parsedPayload.error.format()));
        }

        const user = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (!user) {
            return sendResponse(c, 404, false, "User not Found!! Invalid Email");
        }

        //Check Password
        const checkPassword = await verifyHashedPassword(body.password, user.password);

        if (!checkPassword) {
            return sendResponse(c, 400, false, "Invalid Password");
        }

        const token = await genarateJwt(user.id, envVariable.JWT_SECRET);

        return sendResponse(c, 201, true, "Login Successfull", { token });
    } catch (error : any) {
        return sendResponse(c,error.status ?? 500 , false , error.message ?? "Internal Server Error");
    }


};
