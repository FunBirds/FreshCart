import "express-async-errors";
import { config } from "dotenv";
config();
import "./helpers/logger";
import express from "express";
import routes from "./routes/routes";

import { dbConnect } from "./helpers/dbconnector";




export const app = express();
dbConnect();
routes(app);
app.listen(process.env.PORT || 4000, () => console.log("Server is running..."));
