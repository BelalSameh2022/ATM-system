import { Router } from "express";
import * as UC from "./user.controllers.js";
import * as UV from "./user.validations.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { checkIfUser } from "../../middlewares/checkIfExists.middleware.js";

const userRouter = Router();

userRouter.post("/register", validate(UV.registerSchema),checkIfUser, UC.register);
userRouter.post("/login", validate(UV.loginSchema), UC.login);


export default userRouter;
