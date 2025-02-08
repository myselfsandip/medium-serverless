import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

const errorHandler = async (c : Context, next : Next) => {
    try {
        await next();
    } catch (err) {
        console.error("Error:", err);

        if (err instanceof HTTPException) {
            return c.json({ error: err.message }, err.status);
        }

        return c.json({ error: "Internal Server Error" }, 500);
    }
};

export default errorHandler;
