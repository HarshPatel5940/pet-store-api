import { config } from "dotenv";
import { MongoClient } from "mongodb";
import { validatePet, validateOwner } from "./validate";
config();

if (process.env.MONGO_URI === undefined) {
    console.log("Please set the environment variable MONGO_URI");
    process.exit(1);
}
let client: MongoClient;
try {
    client = new MongoClient(process.env.MONGO_URI);
} catch (e) {
    console.log("Error connecting to the database | Check URI \n---\n");
    console.log(e);
    process.exit(1);
}
const db = client.db("MyDatabase");
const petCollection = db.collection("pets");
const ownerCollection = db.collection("owners");

async function MongoConnect() {
    try {
        await client.connect();
        console.log("> 200 :: Connection Successfully Established");
    } catch (err) {
        console.log("> 500 :: Connection Failed\n---\n");
        console.log(err);
        process.exit(1);
    }
}

async function createUuid(col: "pets" | "owners"): Promise<string | undefined> {
    let uuid;
    import("nanoid").then((nanoid) => {
        uuid = nanoid.nanoid(15);
    });

    const result = await db.collection(col).find({ uuid: uuid }).toArray();

    if (result.length === 0) {
        return uuid;
    } else {
        console.log("UUID : REGENERATING A NEW ONE one");
        return await createUuid(col);
    }
}

async function createOwner(owner: any): Promise<Number> {
    delete owner["_id"];
    delete owner["uuid"];

    owner.uuid = await createUuid("owners");
    const res = await validateOwner(owner);
    if (res === 200) {
        await ownerCollection.insertOne(owner);
        return 200;
    } else {
        return res;
    }
}

async function createPet(pet: any): Promise<Number> {
    delete pet["_id"];
    delete pet["uuid"];

    pet.uuid = await createUuid("pets");
    let res = await validateOwner(pet.OwnerID);

    if (res !== 200) {
        return res;
    }
    res = await validatePet(pet);
    if (res === 200) {
        await ownerCollection.insertOne(pet);
        return 200;
    } else {
        return res;
    }
}

async function updateOwner(owner: any): Promise<Number> {
    delete owner["_id"];
    const res = await validateOwner(owner);
    if (res === 302) {
        await ownerCollection.updateOne({ uuid: owner.uuid }, { $set: owner });
        console.log("> 200 :: Owner Updated Successfully");
        return 200;
    } else {
        return res;
    }
}

async function updatePet(pet: any): Promise<Number> {
    delete pet["_id"];
    let res = await validateOwner(pet.OwnerID);
    if (res !== 302) {
        return res;
    }
    res = await validatePet(pet);
    if (res === 302) {
        await petCollection.updateOne({ uuid: pet.uuid }, { $set: pet });
        console.log("> 200 :: Pet Updated Successfully");
        return 200;
    } else {
        return res;
    }
}

async function deletePet(uuid: string): Promise<Number> {
    const res = await validatePet({ uuid: uuid });
    if (res === 302) {
        await petCollection.deleteOne({ uuid: uuid });
        console.log("> 200 :: Pet Deleted Successfully");
        return 200;
    } else {
        return res;
    }
}

async function deleteOwner(uuid: string): Promise<Number> {
    const res = await validateOwner({ uuid: uuid });
    if (res === 302) {
        await ownerCollection.deleteOne({ uuid: uuid });
        await petCollection.deleteMany({ OwnerID: uuid });
        console.log(
            "> 200 :: Owner Deleted Successfully :: pet's of the owner is also deleted"
        );
        return 200;
    } else {
        return res;
    }
}

async function getAllPets(OwnerID: string): Promise<any> {
    const res = await validateOwner({ uuid: OwnerID });
    if (res === 302) {
        const result = await petCollection.find({ OwnerID: OwnerID }).toArray();
        console.log(result);
        return { code: 200, data: result };
    } else {
        return res;
    }
}
async function getPet(PetID: string): Promise<any> {
    const res = await validatePet({ uuid: PetID });
    if (res === 302) {
        const result = await petCollection.find({ uuid: PetID }).toArray();
        console.log(result);
        return { code: 200, data: result };
    } else {
        return res;
    }
}
export {
    MongoConnect,
    db,
    createOwner,
    createPet,
    updateOwner,
    updatePet,
    deletePet,
    deleteOwner,
    getAllPets,
    getPet,
};
