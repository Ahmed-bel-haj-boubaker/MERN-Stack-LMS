import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

require("dotenv").config();

const emailRegexPattrern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  skills: string[];
  biography: string;
  phoneNumber: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerfied: boolean;
  courses: Array<{ courseId: string; progress: number; status: string }>;
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
  githubId: string;
  githubUsername: string;
  githubUrl: string;
  socialLogin: boolean;
  facebookLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  job?: string;
  ratings?: number;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
    },
    biography: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    skills: {
      type: [String],
      required: false,
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
      required: [true, "Password is required"],
      select: false,
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [12, "Password must be at most 12 characters"],
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
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
    courses: [
      {
        courseId: {
          type: String,
          required: true,
        },
        progress: {
          type: Number,
          default: 0,
        },
        status: {
          type: String,
          enum: ["active", "enrolled", "completed"],
        },
      },
    ],
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
    facebookLink: { type: String, required: false },
    instagramLink: { type: String, required: false },
    linkedinLink: { type: String, required: false },
    twitterLink: { type: String, required: false },
    job: { type: String, required: false },
    ratings: { type: Number, default: 0, required: false },
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
    expiresIn: "1d",
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
