import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";

export const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if(!authorization) {
        return next({message: "Unauthorized"})
    }      
    const decoded = jwt.verify(authorization, "pinkysharkandlime")  
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