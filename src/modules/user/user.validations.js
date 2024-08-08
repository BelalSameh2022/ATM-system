import joi from "joi";

const registerSchema = {
  body: joi
    .object({
      name: joi.string().min(3).max(25).required(),
      password: joi.string().pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
    })
    .required(),
};

const loginSchema = {
  body: joi
    .object({
      name: joi.string().min(3).max(25).required(),
      password: joi.string().pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).required(),
    })
    .required(),
};

export { registerSchema, loginSchema }