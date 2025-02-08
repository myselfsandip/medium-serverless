import { verify, decode, sign } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";


export async function genarateJwt(userId: string, JWT_SECRET: string) {
    const jwtToken: string = await sign({ userId }, JWT_SECRET);
    return jwtToken;
}


export async function verifyJwt(token: string, JWT_SECRET: string): Promise<{ userId: string }> {
    const decoded = await verify(token, JWT_SECRET);

    if (typeof decoded !== "object" || !decoded.userId || typeof decoded.userId !== "string") {
        throw new Error("Invalid token payload");
    }

    return { userId: decoded.userId };
}


