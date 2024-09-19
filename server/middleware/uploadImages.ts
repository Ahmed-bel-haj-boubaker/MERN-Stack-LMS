import multer from "multer";
import { Request } from "express";

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  };

  return multer({ storage: multerStorage, fileFilter: multerFilter });
};

// Export middleware for handling single image upload
export const uploadSingleImage = (fieldName: string) =>
  multerOptions().single(fieldName);

// Export middleware for handling multiple image uploads
export const uploadMultipleImages = (
  fields: Array<{ name: string; maxCount: number }>
) => multerOptions().fields(fields);
