import { Request, Response, Router } from "express";
import { createOwner, updateOwner, deleteOwner, getOwner } from "../utils/mongo";

const router: any = Router();

router.get("/:OwnerID", async (req: Request, res: Response) => {
    let response = await getOwner(req.params.OwnerID);
    try {
        res.status(response.code).send(response.data);
    } catch (err) {
        console.log(err);
    }
});

router.delete("/:OwnerID", async (req: Request, res: Response) => {
    res.sendStatus(await deleteOwner(req.params.OwnerID));
});

router.post("/", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await createOwner(req.body));
});

router.put("/", async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send("No Body Found");
    console.log(req.body);
    res.sendStatus(await updateOwner(req.body));
});

export default router;
