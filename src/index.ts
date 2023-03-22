import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoConnect } from "./utils/mongo";

dotenv.config();
MongoConnect();
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/api/:OwnerID", (req: Request, res: Response) => {});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}}`);
    console.log(`http://localhost:${process.env.PORT}}`);
});
