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
export const signup = AsyncHandler(async (req, res, next) => {
 

  let { firstname, lastname, username, email, password } = req.body;

  const checkuser = await userModel.findOne({ email });
  if (checkuser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashpassword = bcrypt.hashSync(password, 9);

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
    "pinkysharkandlime"
  );
  return res.status(200).json({ message: "Login successful", user , token});
});


