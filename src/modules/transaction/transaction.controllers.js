import { AppError, asyncErrorHandler } from "../../utils/error.js";
import Account from "../../../database/models/account.model.js";
import Transaction from "../../../database/models/transaction.model.js";

// View transaction history
// ============================================
const getHistory = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.user;

  const account = await Account.findOne({ userId });
  if (!account) return next(new AppError("Account not found", 404));

  const transactions = await Transaction.find({ accountId: account._id });
  if (transactions.length === 0) return next(new AppError("There is no transactions yet", 404));

  res.status(201).json({ message: "success", transactions });
});

export { getHistory };
