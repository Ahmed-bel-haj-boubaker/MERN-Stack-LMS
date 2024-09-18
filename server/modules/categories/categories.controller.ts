import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import CategoriesModel from "./categories.model";

// CREATE a new category
export const createCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const categoryExists = await CategoriesModel.findOne({ name });
    if (categoryExists) {
      return next(new ErrorHandler("Category already exists", 400));
    }

    const category = await CategoriesModel.create({ name });
    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      category,
    });
  }
);

// READ all categories
export const getCategories = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await CategoriesModel.find();
    res.status(200).json({
      success: true,
      categories,
    });
  }
);

// READ a single category by ID
export const getCategoryById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoriesModel.findById(req.params.id);
    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    res.status(200).json({
      success: true,
      category,
    });
  }
);

// UPDATE a category by ID
export const updateCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    let category = await CategoriesModel.findById(req.params.id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    category.name = name;
    category.slug = name.toLowerCase().replace(/ /g, "-");

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      category,
    });
  }
);

// DELETE a category by ID
export const deleteCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await CategoriesModel.findById(id);

    if (!category) {
      return next(new ErrorHandler("Category not found", 404));
    }

    await category.deleteOne({ id });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
  }
);
