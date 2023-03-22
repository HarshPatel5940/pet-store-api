import { nanoid } from "nanoid";
import { petSchema, ownerSchema } from "../schema/yup-schemas";
import { db } from "./mongo";

async function validateUuid(
    col: "pets" | "owners"
): Promise<string | undefined> {
    let uuid = nanoid();

    const result = await db.collection(col).find({ uuid: uuid }).toArray();

    if (result.length === 0) {
        return uuid;
    } else {
        console.log("UUID : REGENERATING A NEW ONE one");
        await validateUuid(col);
    }
}

export async function validateOwner(owner: any): Promise<boolean> {
    if (await ownerSchema.isValid(owner)) {
        return true;
    } else {
        return false;
    }
}

export async function validatePet(pet: any): Promise<boolean> {
    if (await petSchema.isValid(pet)) {
        return true;
    } else {
        return false;
    }
}
