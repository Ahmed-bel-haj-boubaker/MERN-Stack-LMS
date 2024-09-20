import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

require("dotenv").config();

const emailRegexPattrern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerfied: boolean;
  courses: Array<{ courseId: string }>;
  xp: number;
  points: number;
  badges: Array<string>;
  level: number;
  achievements: Array<{ title: string; description: string; date: Date }>;
  leaderboardRank: number;
  interest: string[];
  purchasedPlan?: object;
  planStartDate?: Date;
  planEndDate?: Date;
  isPlanActive?: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: {
        validator: function (value: string) {
          return emailRegexPattrern.test(value);
        },
      },
    },

    password: {
      type: String,
      select: false,
      minlength: [6, "Password much be at least 5 characters"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    courses: [{ courseId: String }],
    xp: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        type: String,
      },
    ],
    level: {
      type: Number,
      default: 1,
    },
    achievements: [
      {
        title: { type: String },
        description: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    leaderboardRank: {
      type: Number,
      default: 0,
    },
    interest: { type: [String] },
    purchasedPlan: {
      type: mongoose.Schema.ObjectId,
      ref: "SubscriptionPlan",
      required: false,
    },
    planStartDate: {
      type: Date,
      required: false,
    },
    planEndDate: {
      type: Date,
      required: false,
    },
    isPlanActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//HashPassword before saving

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  console.log("first");
  next();
});

//sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

//sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};

//compare password
userSchema.methods.comparePassword = async function (
  entredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(entredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
