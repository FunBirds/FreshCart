import { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { authRouter } from "./auth.routes";
import morgan from "morgan";
import error from "../middleware/error.middleware";
import adminRouter from "./admin.routes";
import categoryRoutes from "./category.routes";
export default function (app: Express) {
  app.use(
    cors({
      exposedHeaders: ["x-token"],
      optionsSuccessStatus: 200,
    })
  );
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("tiny"));
  app.use("/api/auth", authRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/category', categoryRoutes);
  app.use(error);
}