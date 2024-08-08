import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "./database/connection.js";
import userRouter from "./src/modules/user/user.routes.js";
import accountRouter from "./src/modules/account/account.routes.js";
import transactionRouter from "./src/modules/transaction/transaction.routes.js";
import { globalErrorHandler, invalidUrlHandler } from "./src/utils/error.js";

const app = express();

app.use(express.json());

app.use("/auth", userRouter);
app.use("/accounts", accountRouter);
app.use("/transactions", transactionRouter);

dbConnection();

app.use("*", invalidUrlHandler);
app.use(globalErrorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
