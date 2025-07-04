// import { Router } from "express";
// import { sendMessage, getMessages } from "./controller/message.controller.js";
// import { uploadCloud } from "../../../middleware/multer.cloud.js";
// const router = Router();

// router.post("/send", sendMessage);
// router.get("/", getMessages);
// router.post("/upload-image", uploadCloud.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   return res.status(200).json({
//     message: "File uploaded successfully to Cloudinary",
//     url: req.file?.path,
//     public_id: req.file?.filename,
//     fullData: req.file,
//   });
// });



// export default router;
import { Router } from "express";
import { sendMessage, getMessages } from "./controller/message.controller.js";
import { uploadCloud } from "../../../middleware/multer.cloud.js";
import MessageModel from "./message.model.js"; // ✅ جديد

const router = Router();

router.post("/send", sendMessage);
router.get("/", getMessages);


router.post("/upload-image", uploadCloud.single("image"), async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Message text is required" });
    }

    const imageURL = req.file?.path || null;

    const savedMessage = await MessageModel.create({
      text,
      imageURL,
    });

    res.status(201).json({
      message: "Message saved with image",
      data: savedMessage,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
