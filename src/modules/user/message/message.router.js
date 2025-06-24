import { Router } from "express";
import { sendMessage, getMessages } from "./controller/message.controller.js";

const router = Router();

router.post("/send", sendMessage);
router.get("/", getMessages);

export default router;
