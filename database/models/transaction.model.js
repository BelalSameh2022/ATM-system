import { model, Schema, Types } from "mongoose";

const transactionSchema = new Schema(
  {
    accountId: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdrawal"],
      required: true,
    },
    amount: { 
      type: Number, 
      required: true 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
