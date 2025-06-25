import {auth} from "../../middleware/auntication.js";
import *  as userController from '../../controller/user.js'
import {Router} from "express";
const router = Router();

router.get('/', auth ,userController.getUsers )

export default router