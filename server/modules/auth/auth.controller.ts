import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "./user.model";
import { CatchAsyncError } from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import cloudinary from "cloudinary";
import ejs from "ejs";
import path from "path";
import sendEmail from "../../utils/sendEmail";
import {
  IActivationRequest,
  IActivationToken,
  ILoginRequest,
  IRegistrationBody,
  ISocialAuthBody,
  IUpdatePassword,
  IUpdateProfilePic,
  IUpdateUserInfo,
} from "../../interfaces/authInterface";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../../utils/jwt";
import { redis } from "../../utils/redis";
import {
  getAllUsersService,
  getUserById,
  updateUserRoleService,
} from "./user.service";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

require("dotenv").config();

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, avatar } =
        req.body as IRegistrationBody;
      const isEmailExist = await userModel.find({ email: email });
      if (!isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }

      const user: IRegistrationBody = {
        username,
        email,
        password,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { username: user.username }, activationCode };

      const html = await ejs.renderFile(
        path.join(__dirname, "../../mails/activation-mail.ejs"),
        data
      );

      try {
        const send = await sendEmail({
          email: user.email,
          subject: "Activation Code",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account !`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        console.log(error);
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

export const activatedUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_code, activation_token } =
        req.body as IActivationRequest;
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      const { email, password, username } = newUser.user;
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("user already exist", 400));
      }

      const user = await userModel.create({
        username,
        email,
        password,
      });
      res.status(201).json({ success: true });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = (req.user?._id as string) || "";

      redis.del(userId);
      res
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update access token
export const updataAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = "Please login for access this resources !";

      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }
      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(new ErrorHandler(message, 400));
      }
      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800); //604800==>7day
      req.user = user;
      res.status(200).json({ success: true, accessToken });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      const user = await getUserById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({ success: true, user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const forgotPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    // Check if user exists with this email
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User with this email does not exist", 404));
    }

    const activationToken = createActivationToken(user);

    const verificationCode = activationToken.activationCode;

    await redis.set(email, verificationCode, "EX", 300);

    const data = { user: { username: user.username }, verificationCode };
    const html = await ejs.renderFile(
      path.join(__dirname, "../../mails/forgot-password.ejs"),
      data
    );

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Code",
        template: "forgot-password.ejs",
        data,
      });

      res.status(200).json({
        success: true,
        message: `A verification code has been sent to ${user.email}. Please enter this code to reset your password.`,
        activationToken: activationToken.token,
      });
    } catch (error: any) {
      return next(new ErrorHandler("Email could not be sent", 500));
    }
  }
);

export const verifyCode = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, verificationCode, activationToken } = req.body;

    if (!email || !verificationCode || !activationToken) {
      return next(
        new ErrorHandler(
          "Please provide email, verification code, and activation token",
          400
        )
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(
        activationToken,
        process.env.ACTIVATION_SECRET as string
      ) as { user: { email: string }; activationCode: string };
    } catch (error) {
      return next(new ErrorHandler("Invalid or expired activation token", 400));
    }

    if (decodedToken.user.email !== email) {
      return next(
        new ErrorHandler("Token email does not match provided email", 400)
      );
    }

    if (decodedToken.activationCode !== verificationCode) {
      return next(new ErrorHandler("Invalid verification code", 400));
    }

    const storedCode = await redis.get(email);
    if (!storedCode || storedCode !== verificationCode) {
      return next(
        new ErrorHandler("Invalid or expired verification code", 400)
      );
    }

    res.status(200).json({
      success: true,
      message: "Verification code and activation token are valid",
    });
  }
);
export const updatePasswordWithNewCode = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, newPassword } = req.body;
    console.log(req.body);
    if (!email || !newPassword) {
      return next(
        new ErrorHandler("Please provide email and new password", 400)
      );
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    user.password = newPassword;
    await user.save();
    console.log("55555");
    await redis.del(email);
    console.log("55555");
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  }
);
export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      username,
      email,
      facebookLink,
      instagramLink,
      linkedinLink,
      twitterLink,
      job,
    } = req.body as IUpdateUserInfo;
    const userId = req.user?._id as string;

    const user = await userModel.findById(userId);
    if (email && user) {
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      user.email = email;
    }
    if (username && user) {
      user.username = username || "";
    }
    if (facebookLink && user) {
      user.facebookLink = facebookLink || "";
    }
    if (instagramLink && user) {
      user.instagramLink = instagramLink || "";
    }
    if (linkedinLink && user) {
      user.linkedinLink = linkedinLink || "";
    }
    if (twitterLink && user) {
      user.twitterLink = twitterLink || "";
    }
    if (job && user) {
      user.job = job || "";
    }

    await user?.save();
    await redis.set(userId, JSON.stringify(user));
    res.status(201).json({ success: true, user });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
export const updateUserPassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body as IUpdatePassword;

    if (!oldPassword || !newPassword) {
      return next(
        new ErrorHandler("Please provide both old and new password", 400)
      );
    }

    const userId = req.user?._id as string;
    const user = await userModel.findById(userId).select("+password");

    if (user?.password === undefined) {
      return next(new ErrorHandler("Invalid user", 400));
    }
    const isPasswordMatch = await user?.comparePassword(oldPassword);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = newPassword;
    await user.save();
    await redis.set(userId, JSON.stringify(user));

    res.status(201).json({ success: true, user });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateProfilePic = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body as IUpdateProfilePic;
    const userId = req.user?._id as string;
    const user = await userModel.findById(userId);

    if (avatar && user) {
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
    await user?.save();
    await redis.set(userId, JSON.stringify(user));

    res.status(201).json({ success: true, user });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get All users only for admin
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//only for admin
export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      await updateUserRoleService(id, role, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
//only for admin
export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      await user.deleteOne({ id });
      await redis.del(id);
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `${process.env.SERVER_URL}/api/v1/auth/github/callback`,
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        const { id, username, photos, emails } = profile;
        const email = emails && emails[0]?.value;
        const avatar = photos?.[0]?.value;

        // If no email is found, return an error
        if (!email) {
          return done(new Error("No email found in GitHub profile"), null);
        }

        // Check if user already exists in the database
        let user = await userModel.findOne({ email });

        if (!user) {
          // If user doesn't exist, create a new one
          // Use GitHub login as the username if it's available
          const newUsername = username || `github_${id}`; // Fallback to GitHub id if username is not available

          user = await userModel.create({
            githubId: id,
            username: newUsername, // Ensure username is always provided
            githubUsername: username,
            githubUrl: profile.profileUrl, // Assuming profileUrl is available in GitHub profile
            avatar: {
              public_id: "", // If you are using a file service like Cloudinary, you can store the public_id here
              url: avatar,
            },
            email,
            socialLogin: true, // Indicating this user logged in via GitHub
          });
        }

        // Return the user object to the callback function
        return done(null, user);
      } catch (error) {
        console.error("GitHub authentication error:", error);
        return done(error, null);
      }
    }
  )
);

export const GithubAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "github",
      { session: false },
      (err: any, user: any, info: any) => {
        if (err) {
          console.error("Authentication Error: ", err);
          return next(new ErrorHandler("Authentication failed", 500));
        }

        if (!user) {
          return next(new ErrorHandler("User not found", 404));
        }

        res.cookie("access_token", user.SignAccessToken(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600000, // 1 hour
        });

        // Redirect to the home page
        return res.redirect("http://localhost:3000/home");
      }
    )(req, res, next);
  }
);
