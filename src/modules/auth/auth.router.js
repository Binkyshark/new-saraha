import * as validators from './validation.js'; // ✅ اسم مختلف

import {signup, login} from './controller/auth.js'
import { Router} from "express";
import { validation } from "../../middleware/validation.js";
import { upload } from "../../middleware/multer.js"; 
const router = Router();

const AsyncHandler = (fn) => {
   return (req, res, next) => {
        fn(req, res, next).catch(error => {
         return res.status(500).json({ message: "Error occurred", error: error.message });
        });
   };
};


//  router.post("/signup/:flag", validation(validators.signup), signup);
// router.post(
//   "/signup/:flag",
//   upload.fields([
//     { name: "profilepic", maxCount: 1 },
//     { name: "photos", maxCount: 5 },
//     { name: "documents", maxCount: 5 },
//   ]),
//   validation(validators.signup),
//   signup
// );
router.post(
  "/signup/:flag",
  validation(validators.signup),
  signup
);


router.post("/login", validation(validators.login),login )

export default router


