import Joi from "joi";
import { isValidObjectId, isValidPassword } from "../utils/helper.js";

const registerUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("User").required(),
  }),
};

const loginUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const updateBlogValidation = {
  body: Joi.object().keys({
    id: Joi.string().required().custom(isValidObjectId),
    title: Joi.string().optional(),
    content: Joi.string().optional(),
  }),
};


export {
  registerUserValidation,
  loginUserValidation,
  updateBlogValidation,
};
