import { config } from "dotenv";
import { nanoid } from "nanoid/async";
import { MongoClient } from "mongodb";
import { validatePet, validateOwner, validateUuid } from "./validate";
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

async function CheckConnection() {
    try {
        const status = await client.db("admin").command({
            ping: 1,
        });
        const Data = `Uptime: ${Math.floor(process.uptime())} Seconds | MongoDB: ${status.ok}`;
        console.log(Data);
        return 200;
    } catch (err) {
        console.error(err);
        return 403;
    }
}

async function createUuid(col: "pets" | "owners"): Promise<string | undefined> {
    let uuid = await nanoid(15);

    const result = await db.collection(col).find({ uuid: uuid }).toArray();

    if (result.length === 0) {
        console.log(`UUID : ${col} : Created : uud = ${uuid}`);
        return uuid;
    } else {
        console.log("UUID : REGENERATING A NEW ONE one");
        return await createUuid(col);
    }
}

async function createOwner(owner: any): Promise<number> {
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

async function createPet(pet: any): Promise<number> {
    delete pet["_id"];
    delete pet["uuid"];

    pet.uuid = await createUuid("pets");
    let res = await validateUuid("owners", pet.OwnerID);

    if (res !== 302) {
        return res;
    }
    res = await validatePet(pet);

    if (res === 200) {
        await petCollection.insertOne(pet);
        return 200;
    } else {
        return res;
    }
}

async function updateOwner(owner: any): Promise<number> {
    delete owner["_id"];

    let res = await validateUuid("owners", owner.uuid);

    if (res !== 302) {
        return res;
    }
    res = await validateOwner(owner.uuid);

    if (res === 302) {
        await ownerCollection.updateOne({ uuid: owner.uuid }, { $set: owner });
        console.log("> 200 :: Owner Updated Successfully");
        return 200;
    } else {
        return res;
    }
}

async function updatePet(pet: any): Promise<number> {
    delete pet["_id"];
    let res = await validateUuid("owners", pet.OwnerID);

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

async function deletePet(uuid: string): Promise<number> {
    const res = await validateUuid("pets", uuid);
    if (res === 302) {
        await petCollection.deleteOne({ uuid: uuid });
        console.log("> 200 :: Pet Deleted Successfully");
        return 200;
    } else {
        return res;
    }
}

async function deleteOwner(uuid: string): Promise<number> {
    const res = await validateUuid("owners", uuid);
    if (res === 302) {
        await ownerCollection.deleteOne({ uuid: uuid });
        await petCollection.deleteMany({ OwnerID: uuid });
        console.log("> 200 :: Owner Deleted Successfully :: pet's of the owner is also deleted");
        return 200;
    } else {
        return res;
    }
}

async function getAllPets(OwnerID: string): Promise<any> {
    const res = await validateUuid("owners", OwnerID);
    if (res === 302) {
        const result = await petCollection.find({ OwnerID: OwnerID }).toArray();
        console.log(result);
        return { code: 200, data: result };
    } else {
        return res;
    }
}
async function getPet(PetID: string): Promise<any> {
    const res = await validateUuid("pets", PetID);
    if (res === 302) {
        const result = await petCollection.find({ uuid: PetID }).toArray();
        console.log(result);
        return { code: 200, data: result };
    } else {
        return { code: res, data: null };
    }
}

async function getOwner(OwnerID: string): Promise<any> {
    const res = await validateUuid("owners", OwnerID);
    if (res === 302) {
        const result: any = await ownerCollection.findOne({ uuid: OwnerID });
        try {
            delete result["_id"];
        } catch (error) {
            console.log(error);
        }
        console.log(result);
        return { code: 200, data: result };
    } else {
        return { code: res, data: null };
    }
}
export {
    MongoConnect,
    db,
    getPet,
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    getOwner,
    createOwner,
    updateOwner,
    deleteOwner,
    CheckConnection,
};
