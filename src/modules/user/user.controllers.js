import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, asyncErrorHandler } from "../../utils/error.js";
import User from "../../../database/models/user.model.js";

// Register
// ============================================
const register = asyncErrorHandler(async (req, res, next) => {
  const { name, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  const user = await User.create({
    name,
    password: hashedPassword,
  });
  if (!user) return next(new AppError("User registration failed", 400));

  res.status(201).json({ message: "success", user });
});

// Login
// ============================================
const login = asyncErrorHandler(async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name: name?.toLowerCase() });
  if (!user || !bcrypt.compareSync(password, user.password))
    return next(new AppError("Invalid credentials", 401));

  jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) return next(new AppError(err.message, 400));

      res.status(200).json({ message: "success", token });
    }
  );
});

export { register, login };
