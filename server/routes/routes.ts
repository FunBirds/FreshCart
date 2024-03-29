import { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { userRouter } from "./user.routes";
import morgan from "morgan";
import methodOverride from "method-override";
import error from "../middleware/error.middleware";
import adminRouter from "./admin.routes";
import categoryRoutes from "./category.routes";
import productRoute from "./product.routes";
import vendorRoute from "./vendor.routes";
import fileRoute from "./files.routes";
import orderRoutes from "./order.routes";
import reviewRoutes from "./review.routes";
import generalRouter from "./general.routes";

export default function (app: Express) {
  app.use(
    cors({
      exposedHeaders: ["x-token", "x-vendor-token", "x-admin-token"],
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
  app.use(methodOverride("_method"));
  app.use(morgan("tiny"));
  app.use("/api/auth", userRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/category", categoryRoutes);
  app.use("/api/product", productRoute);
  app.use("/api/vendor", vendorRoute);
  app.use("/api/files", fileRoute);
  app.use("/api/order", orderRoutes);
  app.use("/api/review", reviewRoutes);
  app.use("/api/general", generalRouter);
  app.use(error);
}
