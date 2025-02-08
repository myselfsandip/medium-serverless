import bcryptjs from "bcryptjs";

export async function hashPassword(password: string){
    const hashedPassword : string = await bcryptjs.hash(password,12);
    return hashedPassword;
}