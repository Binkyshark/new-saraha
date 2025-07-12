// import jwt from "jsonwebtoken";
// import userModel from "../../DB/model/user.model.js";

// export const auth = async (req, res, next) => {
//     const { authorization } = req.headers;
//     console.log(authorization);
//     if(!authorization?.startsWith("process.env.TOKEN_BEARER ")) {
//         return next({message: "Unauthorized or invalid bearer key"})
//     }      
//     console.log(authorization.startsWith("Bearer "));
//     const token = authorization.split("bearer ");
//     console.log(token);
//     const decoded = jwt.verify(authorization, process.env.TOKEN_BEARER)  
//     console.log(decoded);
//     if(!decoded?.id) {
//         return next({message: "Unauthorized"})
//     }
//     const user = await userModel.findById(decoded.id)   
//     if(!user) {
//         return next({message: "Unauthorized"})
//     }
//     req.user = user   
//     return next()   
// }
import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";

export const auth = async (req, res, next) => {
  try {
    console.log("All env variables:", {
      TOKEN_BEARER: process.env.TOKEN_BEARER,
      JWT_SECRET: process.env.JWT_SECRET,
      token_signature: process.env.token_signature
    });
    const { authorization } = req.headers;
    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized or invalid bearer key" });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_BEARER); // نفس secret بتاع sign
    if (!decoded?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("Auth Error:", err);
    return res.status(500).json({ message: "Authentication error", error: err.message });
  }
};
export default auth;