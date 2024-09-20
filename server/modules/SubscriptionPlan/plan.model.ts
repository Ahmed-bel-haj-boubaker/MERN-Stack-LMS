import mongoose from "mongoose";

interface IPricing {
  duration: string; // e.g., "monthly", "yearly", "two years"
  price: number;
  priceAfterDiscount: number;
}

interface ISubscriptionPlan {
  planName: string;
  description: string;
  pricing: IPricing[];
  features: string[];
  isActive: boolean;
  purchasedCount: number;
  students: mongoose.Types.ObjectId[];
}

const pricingSchema = new mongoose.Schema<IPricing>(
  {
    duration: {
      type: String,
      enum: ["monthly", "yearly", "two years"],
      required: true,
    },
    price: { type: Number, required: true },
    priceAfterDiscount: { type: Number, required: false },
  },
  { _id: false }
);

const subscriptionPlanSchema = new mongoose.Schema<ISubscriptionPlan>(
  {
    planName: { type: String, required: true },
    description: { type: String, required: true },
    pricing: { type: [pricingSchema], required: true },
    features: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
    purchasedCount: { type: Number, default: 0 },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SubscriptionPlan = mongoose.model<ISubscriptionPlan>(
  "SubscriptionPlan",
  subscriptionPlanSchema
);

export default SubscriptionPlan;
