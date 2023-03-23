import { app } from "..";
import { Request, Response } from "express";
import {
    getAllPets,
    getPet,
    createPet,
    updatePet,
    deletePet,
} from "../utils/mongo";

app.route("/api/pets/:PetID")
    .get(async (req: Request, res: Response) => {
        let response = await getPet(req.params.PetID);
        try {
            res.status(response.code).send(response.data);
        } catch (err) {
            console.log(err);
        }
    })
    .delete(async (req: Request, res: Response) => {
        res.sendStatus(await deletePet(req.params.PetID));
    });

app.route("/api/pets")
    .post(async (req: Request, res: Response) => {
        if (!req.body) return res.status(400).send("No Body Found");
        console.log(req.body);
        res.sendStatus(await createPet(req.body));
    })
    .put(async (req: Request, res: Response) => {
        if (!req.body) return res.status(400).send("No Body Found");
        console.log(req.body);
        res.sendStatus(await updatePet(req.body));
    });

app.get("/api/allpets/:OwnerID", async (req: Request, res: Response) => {
    const response = await getAllPets(req.params.OwnerID);
    res.status(response.code).send(response.data);
});
