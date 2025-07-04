import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js"; // اسم الملف اللي عدّلناه

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "saraha_uploads", 
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

export const uploadCloud = multer({ storage });
