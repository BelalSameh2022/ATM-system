import { AppError } from "../utils/error.js";
import User from "../../database/models/user.model.js";

const checkIfUser = async (req, res, next) => {
  const { name } = req.body;
  const user = await User.findOne({ name: name?.toLowerCase() });
  if (user)
    return next(
      new AppError(
        "User already exists: change your name and try again",
        409
      )
    );
  next();
};

export { checkIfUser };
