import userModel from "../../../../DB/model/user.model.js";
import bcrypt from "bcryptjs";


const AsyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};
import jwt from "jsonwebtoken";
import * as validation from "../validation.js";
export const signup = AsyncHandler(async (req, res, next) => {
 

  let { firstname, lastname, username, email, password } = req.body;



  //   const validationResult = validation.signup.validate(req.body, { abortEarly: false });

  // if (validationResult.error) {
  //   return res.status(400).json({
  //     message: "Validation failed",
  //     errors: validationResult.error.details.map((err) => err.message)
  //   });
  // }










  const checkuser = await userModel.findOne({ email });
  if (checkuser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashpassword = bcrypt.hashSync(password, parseInt(process.env.SALT));

  const user = await userModel.create({
    firstname,
    lastname,
    username,
    email,
    password: hashpassword,
  });
  const token = jwt.sign(
    {username: user.username, id: user._id},
    "pinkysharkandlime"
  )
  return res.status(201).json({ message: "User created successfully", user , token});
});

export const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // const validationResult = validation.login.validate(req.body, {
  //   abortEarly: false,
  // });
  // if (validationResult.error) {
  //   return res.status(400).json({
  //     message: "Validation failed",
  //     errors: validationResult.error.details.map((err) => err.message),
  //   });
  // }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }
  const token = jwt.sign(
    { username: user.username, id: user._id },
    // "pinkysharkandlime"
    process.env.token_signature,
  );
  return res.status(200).json({ message: "Login successful", user , token});
});


