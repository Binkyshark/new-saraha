// import userModel from "../../DB/model/user.model.js"


// export const getUsers = async (req, res) => {
//     const users = await userModel.find()
//     return res.json({message: "done", users})
// }
import userModel from "../../DB/model/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.json({ message: "done", users });
    } catch (error) {
        return res.status(500).json({ message: "DB Error", error });
    }
};
