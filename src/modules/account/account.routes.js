import { Router } from "express";
import * as AC from "./account.controllers.js";
import * as AV from "./account.validations.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

const accountRouter = Router();

accountRouter
  .route("/")
  .post(auth(), AC.createAccount)
  .get(auth(), AC.getBalance);
accountRouter.post("/deposit", validate(AV.depositSchema), auth(), AC.deposit);
accountRouter.post(
  "/withdrawal",
  validate(AV.withdrawalSchema),
  auth(),
  AC.withdrawal
);

export default accountRouter;
