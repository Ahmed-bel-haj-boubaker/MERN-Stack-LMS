import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import SubscriptionPlan from "./plan.model";
import userModel from "../auth/user.model";

export const createPlan = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { planName, description, pricing, features } = req.body;

      // Validate required fields
      if (!planName || !description || !pricing || !features) {
        return next(new ErrorHandler("Missing required fields", 400));
      }

      const newPlan = new SubscriptionPlan({
        planName,
        description,
        pricing,
        features,
      });

      const savedPlan = await newPlan.save();

      res.status(201).json({
        success: true,
        message: "Subscription plan created successfully",
        plan: savedPlan,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const purchasePlan = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const { planId } = req.body;
      const plan = await SubscriptionPlan.findById(planId);
      if (!plan) {
        return next(new ErrorHandler("Subscription plan not found", 404));
      }

      const selectedPricing = plan.pricing[0];
      if (!selectedPricing) {
        return next(new ErrorHandler("No pricing options available", 400));
      }

      user.purchasedPlan = planId;
      user.planStartDate = new Date();
      user.planEndDate = new Date();

      if (selectedPricing.duration === "monthly") {
        user.planEndDate.setMonth(user.planEndDate.getMonth() + 1);
      } else if (selectedPricing.duration === "yearly") {
        user.planEndDate.setFullYear(user.planEndDate.getFullYear() + 1);
      } else if (selectedPricing.duration === "two years") {
        user.planEndDate.setFullYear(user.planEndDate.getFullYear() + 2);
      }

      user.isPlanActive = true;

      await user.save();

      if (!plan.students.includes(user._id as any)) {
        plan.purchasedCount += 1;
        plan.students.push(user._id as any);
        await plan.save();
      } else {
        return next(
          new ErrorHandler("you have already purchased this plan", 400)
        );
      }
      res.status(200).json({
        success: true,
        message: "Plan purchased successfully",
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
