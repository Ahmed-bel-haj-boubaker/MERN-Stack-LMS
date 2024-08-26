import userModel, { IUser } from "../models/user.model";
import { redis } from "../utils/redis";

export const getUserById = async (id: string) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    return user;
  }
};
