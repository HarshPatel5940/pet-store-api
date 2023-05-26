import { Request, Response, Router } from "express";
import { getAllPets, getPet, createPet, updatePet, deletePet } from "../utils/mongo";

const router: any = Router();

router.get("/:PetID", async (req: Request, res: Response) => {
    let response = await getPet(req.params.PetID);
    try {
        res.status(response.code).send(response.data);
    } catch (err) {
        console.log(err);
    }
});

router.delete("/:PetID", async (req: Request, res: Response) => {
    res.sendStatus(await deletePet(req.params.PetID));
});

router.post("/", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await createPet(req.body));
});

router.put("/", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await updatePet(req.body));
});

router.get("/ownby/:OwnerID", async (req: Request, res: Response) => {
    let response = await getAllPets(req.params.OwnerID);
    try {
        res.status(response.code).send(response.data);
    } catch (err) {
        console.log(err);
    }
});

export default router;
