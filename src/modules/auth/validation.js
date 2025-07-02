import joi from "joi";

export const signup = {
  body:  joi.object({
  firstname: joi.string().min(3).max(30).required(),
  lastname: joi.string().min(3).max(30).required(),
  username:joi.string().alphanum().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9@._-]{8,30}$")).required(),
  // age: joi.number().integer().positive().min(18).required(),
  // ingredients: joi.array().items(joi.string()).required(),
  
}).required(),
params: joi.object({
  flag:joi.boolean().required()
}).required()
}

export const login = joi.object({
  email: joi.string().email({minDomainSegments: 2, maxDomainSegments: 4, tlds: { allow: ['com' , 'net' , 'edu' , 'eg'] }}).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9@._-]{8,30}$")).required(),
}).required();