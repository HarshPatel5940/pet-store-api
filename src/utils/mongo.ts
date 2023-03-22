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

export { MongoConnect, db };
