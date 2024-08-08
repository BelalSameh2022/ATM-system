import { AppError, asyncErrorHandler } from "../../utils/error.js";
import Account from "../../../database/models/account.model.js";
import Transaction from "../../../database/models/transaction.model.js";

// Create account
// ============================================
const createAccount = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.user;

  const account = await Account.create({ userId });
  if (!account) return next(new AppError("Account creation failed", 400));

  res.status(201).json({ message: "success", account });
});

// Deposit
// ============================================
const deposit = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { amount } = req.body;

  const account = await Account.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true }
  );
  if (!account) return next(new AppError("Account not found", 404));

  const transaction = new Transaction({ accountId: account._id, type: "deposit", amount });
  await transaction.save();

  res.status(200).json({ message: "success", account });
});

// Withdrawal
// ============================================
const withdrawal = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { amount } = req.body;

  const account = await Account.findOne({ userId });
  if (account.balance < amount) {
    return next(new AppError("Insufficient funds", 400));
  }
  account.balance -= amount;
  await account.save();

  const transaction = new Transaction({
    accountId: account._id,
    type: "withdrawal",
    amount,
  });
  await transaction.save();

  res.status(200).json({ message: "success", account });
});

// Balance Inquiry
// ============================================
const getBalance = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.user;

  const account = await Account.findOne({ userId });
 if (!account) return next(new AppError("Account not found", 404));

  res.status(200).json({ message: "success", balance: account.balance });
});

export { createAccount, deposit, withdrawal, getBalance };
