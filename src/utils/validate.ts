import { petSchema, ownerSchema } from "../schema/yup-schemas";

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
