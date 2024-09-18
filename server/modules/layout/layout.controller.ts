import { Request, Response, NextFunction } from "express";
 
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import LayoutModel from "./layout.model";
import ErrorHandler from "../../utils/ErrorHandler";
 

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

export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" });

        const { image, subTitle, title } = req.body;
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }
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

        await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqExist = await LayoutModel.findOne({ type: "FAQ" });
        const faqItem = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        await LayoutModel.findByIdAndUpdate(faqExist?._id, {
          type: "FAQ",
          faq: faqItem,
        });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesExist = await LayoutModel.findOne({
          type: "Categories",
        });
        const categoriesItem = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesExist?._id, {
          type: "Categories",
          categories: categoriesItem,
        });
      }

      res
        .status(201)
        .json({ success: true, message: "Layout updated successfully !" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const layout = await LayoutModel.findOne({ type });
      res.status(200).json({ success: true, layout });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
