import { Router } from "express";
import * as TC from "./transaction.controllers.js";
import { auth } from "../../middlewares/auth.middleware.js";

const transactionRouter = Router();

transactionRouter.get("/", auth(), TC.getHistory);

export default transactionRouter;
