export interface IRegistrationBody {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IActivationToken {
  token: string;
  activationCode: string;
}

export interface IActivationRequest {
  activation_code: string;
  activation_token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export interface ISocialAuthBody {
  email: string;
  avatar: string;
  name: string;
}

export interface IUpdateUserInfo {
  username?: string;
  email?: string;
  facebookLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  job?: string;
  firstName?: string;
  lastName?: string;
  skills?: string[];
  biography?: string;
  phoneNumber?: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateProfilePic {
  avatar: string;
}
