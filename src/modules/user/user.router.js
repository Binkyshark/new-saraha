import *  as userController from '../../controller/user.js'
import {Router} from "express";
const router = Router();

router.get('/', userController.getUsers )

export default router