import { Request, Response } from "express";
import { app } from "..";
import {
    createOwner,
    updateOwner,
    deleteOwner,
    getOwner,
} from "../utils/mongo";

app.route("/api/owners/:OwnerID")
    .get(async (req: Request, res: Response) => {
        let response = await getOwner(req.params.OwnerID);
        try {
            res.status(response.code).send(response.data);
        } catch (err) {
            console.log(err);
        }
    })
    .delete(async (req: Request, res: Response) => {
        res.sendStatus(await deleteOwner(req.params.OwnerID));
    });

app.route("/api/owners")
    .post(async (req: Request, res: Response) => {
        if (!req.body) return res.status(400).send("No Body Found");
        console.log(req.body);
        res.sendStatus(await createOwner(req.body));
    })
    .put(async (req: Request, res: Response) => {
        if (!req.body) return res.status(400).send("No Body Found");
        console.log(req.body);
        res.sendStatus(await updateOwner(req.body));
    });
