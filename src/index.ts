import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {
    MongoConnect,
    createOwner,
    createPet,
    updateOwner,
    updatePet,
    deletePet,
    deleteOwner,
    getAllPets,
    getPet,
} from "./utils/mongo";

dotenv.config();
MongoConnect();
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send(
        "Hello World! You Currently testing the Pet Store API"
    );
});

app.get("/api/owner/:OwnerID", async (req: Request, res: Response) => {
    const response = await getAllPets(req.params.OwnerID);
    res.status(response.code).send(response.data);
});

app.get("/api/pet/:PetID", async (req: Request, res: Response) => {
    let response = await getPet(req.params.PetID);
    try {
        res.status(response.code).send(response.data);
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/owner", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await createOwner(req.body));
});

app.post("/api/pet", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await createPet(req.body));
});

app.patch("/api/owner", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await updateOwner(req.body));
});

app.patch("/api/pet", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await updatePet(req.body));
});

app.delete("/api/owner/:OwnerID", async (req: Request, res: Response) => {
    res.sendStatus(await deleteOwner(req.params.OwnerID));
});

app.delete("/api/pet/:PetID", async (req: Request, res: Response) => {
    res.sendStatus(await deletePet(req.params.PetID));
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`);
});
