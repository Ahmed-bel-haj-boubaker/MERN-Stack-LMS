import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

require("dotenv").config();

const emailRegexPattrern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerfied: boolean;
  courses: Array<{ courseId: string }>;
  admincourses: mongoose.Types.ObjectId[];
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
  githubId: string; // GitHub ID
  githubUsername: string; // GitHub username
  githubUrl: string; // GitHub profile URL
  socialLogin: boolean; // Flag for social login
  comparePassword: (password: string) => Promise<boolean>; // Method for password comparison
  SignAccessToken: () => string; // Method to sign access token
  SignRefreshToken: () => string; // Method to sign refresh token
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
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
      minlength: [6, "Password must be at least 6 characters"],
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
    admincourses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "AdminCourse",
      required: true,
    },
    // GitHub fields for social login
    githubId: {
      type: String,
      required: false,
    },
    githubUsername: {
      type: String,
      required: false,
    },
    githubUrl: {
      type: String,
      required: false,
    },
    socialLogin: {
      type: Boolean,
      required: false,
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
