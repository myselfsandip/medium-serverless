import { verify, sign } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

interface JwtPayload extends JWTPayload {
    userId: number;
}

export async function generateJwt(userId: number, JWT_SECRET: string): Promise<string> {
    try {
        const jwtToken: string = await sign({ userId }, JWT_SECRET);
        return jwtToken;
    } catch (error) {
        throw new Error("Error generating JWT");
    }
}

export async function verifyJwt(token: string, JWT_SECRET: string): Promise<{ userId: number }> {
    try {
        const decoded = await verify(token, JWT_SECRET) as JwtPayload;

        if (!decoded || typeof decoded.userId !== "number") {
            throw new Error("Invalid token payload");
        }

        return { userId: decoded.userId };
    } catch (error) {
        throw new Error("Error verifying JWT");
    }
}