import userModel, { IUser } from "../models/user.model";
 

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await userModel.findById(id);
};
