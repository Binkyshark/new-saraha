import jwt from "jsonwebtoken"
import userModel from "../../DB/model/user.model.js";


export const getUsers = async (req, res) => {
   
    try {
        const users = await userModel.find();
        return res.json({ message: "done", users:req.user });
    } catch (error) {
        return res.status(500).json({ message: "DB Error", error });
    }
};
