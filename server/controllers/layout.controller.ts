import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import LayoutModel from "../models/layout.model";

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`this type ${type} exist`, 400));
      }
      if (type === "Banner") {
        const { image, subTitle, title } = req.body;

        const mycloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
          },
          title,
          subTitle,
        };

        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItem = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        await LayoutModel.create({ type: "FAQ", faq: faqItem });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItem = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({
          type: "Categories",
          categories: categoriesItem,
        });
      }

      res
        .status(201)
        .json({ success: true, message: "Layout created successfully !" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
