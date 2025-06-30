import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";

export const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if(!authorization?.startsWith("process.env.TOKEN_BEARER ")) {
        return next({message: "Unauthorized or invalid bearer key"})
    }      
    console.log(authorization.startsWith("Bearer "));
    const token = authorization.split("bearer ");
    console.log(token);
    const decoded = jwt.verify(authorization, process.env.TOKEN_BEARER)  
    console.log(decoded);
    if(!decoded?.id) {
        return next({message: "Unauthorized"})
    }
    const user = await userModel.findById(decoded.id)   
    if(!user) {
        return next({message: "Unauthorized"})
    }
    req.user = user   
    return next()   
}