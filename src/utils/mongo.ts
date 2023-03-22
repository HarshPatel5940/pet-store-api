import { config } from "dotenv";
import { nanoid } from "nanoid";
import { MongoClient } from "mongodb";
import { validatePet, validateOwner } from "./validate";
config();
