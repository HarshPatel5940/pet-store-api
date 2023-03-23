import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoConnect, CheckConnection } from "./utils/mongo";

dotenv.config();
MongoConnect();
export const app = express();
app.use(express.json());

app.get("/", function (req, res) {
    res.status(200).send(
        "Hello World! Thanks for using Pet-Store-API, Fell free to checkout other ENDPOINTS"
    );
});

app.get("/api/CheckConnection", async (req: Request, res: Response) => {
    res.sendStatus(await CheckConnection());
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`);
});
