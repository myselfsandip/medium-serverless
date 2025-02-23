import { Context, Next } from "hono";
import { EnvVariables } from "../types/envTypes";
import sendResponse from "../utils/sendResponse";
import { verifyJwt } from "../utils/JWT_Tokens";

export default async function authMiddleware(c: Context, next: Next) {
    try {
        //get the header
        //verify the header wih Bearer Token
        //if the header is correct , we can proceed 
        //if not , we return the user a 401 status code 
        const envVariable = c.get("envVariable") as EnvVariables;

        const authHeader = c.req.header('Authorization');

        if (!authHeader) {
            return sendResponse(c, 401, false, "Unauthorized Access - Authorization is Required");
        }

        const token = authHeader?.split(' ')[1];

        if (!token) {
            return sendResponse(c, 401, false, "Unauthorized Access - Authorization Token is Required");
        }

        const decoded = await verifyJwt(token, envVariable.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            return sendResponse(c, 401, false, "Unauthorized: Invalid token");
        }
        c.set('userId', decoded.userId);
        return next();
    } catch (error: any) {
        return sendResponse(c, error.status ?? 500, false, error.message ?? "Internal Server Error");
    }
}