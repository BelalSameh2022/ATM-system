import joi from "joi";

const depositSchema = {
  body: joi
    .object({
      amount: joi.number().positive().min(10).max(8000).required(),
    })
    .required(),
};

const withdrawalSchema = {
    body: joi
    .object({
      amount: joi.number().positive().min(10).max(8000).required(),
    })
    .required(),
};

export { depositSchema, withdrawalSchema }