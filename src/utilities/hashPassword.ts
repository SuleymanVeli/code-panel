import { hash } from "bcryptjs";

export async function hashPassword(params:string) {
    
    return await hash(params, 12);
}