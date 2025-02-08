import bcryptjs from "bcryptjs";

export async function hashPassword(password: string){
    const hashedPassword : string = await bcryptjs.hash(password,12);
    return hashedPassword;
}


export async function verifyHashedPassword(password: string,dbPassword : string){
    const verify : boolean = await bcryptjs.compare(password,dbPassword);
    return verify;
}