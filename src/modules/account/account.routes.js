import { Router } from "express";
import * as AC from "./account.controllers.js";
import * as AV from "./account.validations.js";
import { auth } from "../../middlewares/auth.middleware.js";

const accountRouter = Router();

accountRouter
  .route("/")
  .post(auth(), AC.createAccount)
  .get(auth(), AC.getBalance);
accountRouter.post("/deposit", auth(), AC.deposit);
accountRouter.post("/withdrawal", auth(), AC.withdrawal);

export default accountRouter;
