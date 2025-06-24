import {signup, login} from './controller/auth.js'
import { Router} from "express";
const router = Router();

const AsyncHandler = (fn) => {
   return (req, res, next) => {
        fn(req, res, next).catch(error => {
         return res.status(500).json({ message: "Error occurred", error: error.message });
        });
   };
};


router.post("/signup",signup);
router.post("/login",login )

export default router
