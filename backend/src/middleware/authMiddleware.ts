import { Context, Next } from "hono";
import { EnvVariables } from "../types/envTypes";
import sendResponse from "../utils/sendResponse";
import { verifyJwt } from "../utils/JWT_Tokens";

export default async function authMiddleware(c: Context, next: Next) {
    try {
        const envVariable = c.get("envVariable") as EnvVariables;
        const authHeader = c.req.header('Authorization');
        if (!authHeader) {
            return sendResponse(c, 401, false, "Unauthorized Access - Authorization is Required");
        }
        const token = authHeader.split(' ')[1];  // Getting the Exact JWT Token
        if (!token) {
            return sendResponse(c, 401, false, "Unauthorized Access - Authorization Token is Required");
        }
        const decoded = await verifyJwt(token, envVariable.JWT_SECRET); //Verify JWT Func
        if (!decoded || !decoded.userId) {
            return sendResponse(c, 401, false, "Unauthorized: Invalid token");
        }
        c.set('userId', decoded.userId);
        await next();
    } catch (error: any) {
        // Handle any errors that occur during the process
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
}