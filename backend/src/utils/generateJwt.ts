import { jwt, verify, decode, sign } from "hono/jwt";


export default async function genarateJwt(userId: string){
    const jwtToken: string =  await sign({userId},"veryverysecretkey");
    return jwtToken;
}