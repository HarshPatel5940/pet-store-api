import { petSchema, ownerSchema } from "../schema/yup-schemas";
import { db } from "./mongo";

async function validateUuid(
    col: "pets" | "owners",
    uuid: string
): Promise<Number> {
    const result = await db.collection(col).find({ uuid: uuid }).toArray();
    if (result.length === 0) {
        console.log("> 302 :: uuid Found");
        return 302;
    } else {
        console.log("> 302 :: uuid Not Found");
        return 404;
    }
}

export async function validateOwner(owner: any): Promise<Number> {
    if (await ownerSchema.isValid(owner)) {
        if ((await validateUuid("owners", owner.uuid)) === 302) {
            console.log("> 200 :: Owner Validation OK | Found");
            return 200;
        } else {
            console.log("> 404 :: Owner Validation OK | NOT FOUND");
            return 404;
        }
    } else {
        console.log("> 400 :: Owner Validation Failed ");
        return 400;
    }
}

export async function validatePet(pet: any): Promise<Number> {
    if (await petSchema.isValid(pet)) {
        if ((await validateUuid("pets", pet.uuid)) === 302) {
            console.log("> 200 :: Pet Validation OK | Found");
            return 200;
        } else {
            console.log("> 404 :: Pet Validation OK | NOT FOUND");
            return 404;
        }
    } else {
        console.log("> 400 :: Pet Validation Failed ");
        return 400;
    }
}
