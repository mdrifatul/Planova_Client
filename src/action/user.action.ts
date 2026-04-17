"use server";

import { ApiResponse, UpdateUserProfileDto, User } from "@/interfaces";
import { userService } from "@/services/user.service";

export const getSessionAction = async () => {
  const res = await userService.getSession();
  return res;
};

export const getAllUsersAction = async () => {
  const res = await userService.getAllUser();
  return res;
};

export const updateUserStatusAction = async (id: string, status?: string) => {
  const res = await userService.updateUserStatus(id, status);
  return res;
};

export const updateUserRoleAction = async (id: string, role?: string) => {
  const res = await userService.updateUserRole(id, role);
  return res;
};

export const updateUserProfileAction = async (
  id: string,
  data: UpdateUserProfileDto,
): Promise<ApiResponse<User>> => {
  const res = await userService.updateUserProfile(id, data);
  return res;
};

export const getUserByIdAction = async (id: string) => {
  const res = await userService.getUserById(id);
  return res;
};

export const deleteUserAction = async (id: string) => {
  const res = await userService.deleteUser(id);
  return res;
};
