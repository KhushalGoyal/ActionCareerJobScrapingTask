import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"; 
import dotenv from "dotenv";
import {serve, setup} from "swagger-ui-express";
import * as swaggerDoc from "../swagger.json";
import JobController from "./controllers/JobController";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(morgan("combined"));
app.use("/api", JobController);
app.use("/api-doc", serve, setup(swaggerDoc));
app.listen(port, () => {
    console.log("App is running on port : " + port)
})