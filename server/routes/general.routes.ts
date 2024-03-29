import express from "express";
import GeneralController from "../controllers/general.controller";
import adminMiddleware from "../middleware/admin.middleware";
import { upload } from "../models/gridfs.model";

const controller = new GeneralController();
const generalRouter = express.Router();
generalRouter.get("/info", controller.getInfo);
generalRouter.put(
  "/info/update",
  [
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "logo", maxCount: 1 },
    ]),
    adminMiddleware,
  ],
  controller.updateInfo,
);
export default generalRouter;
