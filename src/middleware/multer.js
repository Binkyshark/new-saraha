import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/general"); // لازم يكون الفولدر ده موجود فعليًا
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, nanoid() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed"), false);
  }
};


export const upload = multer({ storage, fileFilter });
