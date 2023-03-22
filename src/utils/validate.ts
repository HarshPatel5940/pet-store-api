import { petSchema, ownerSchema } from "../schema/yup-schemas";
import { db } from "./mongo";

export async function validateUuid(
    col: "pets" | "owners",
    uuid: string
): Promise<number> {
    const result = await db.collection(col).find({ uuid: uuid }).toArray();
    if (result.length !== 0) {
        return 302;
    } else {
        return 404;
    }
}

export async function validateOwner(owner: any): Promise<number> {
    if (await ownerSchema.isValid(owner)) {
        if ((await validateUuid("owners", owner.uuid)) === 302) {
            console.log("> 302 :: Owner Validation | Found");
            return 302;
        } else {
            console.log("> 200 :: Owner Validation | NOT FOUND");
            return 200;
        }
    } else {
        console.log("> 400 :: Owner Validation Failed ");
        return 400;
    }
}

export async function validatePet(pet: any): Promise<number> {
    if (await petSchema.isValid(pet)) {
        if ((await validateUuid("pets", pet.uuid)) === 302) {
            console.log("> 302 :: Pet Validation | Found");
            return 302;
        } else {
            console.log("> 200 :: Pet Validation | NOT FOUND");
            return 200;
        }
    } else {
        console.log("> 400 :: Pet Validation Failed ");
        return 400;
    }
}
