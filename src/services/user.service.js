import { UserToResponse, bodyToUpdateUser, userToResponse } from "../dtos/user.dto.js";
import { DuplicateUserEmailError, UnauthorizedError } from "../../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference, 
  updateUserById
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return UserToResponse(user, preferences);
};

export const updateMyInfoService = async (userId, body) => {
  if (!userId) {
    throw new UnauthorizedError("로그인이 필요합니다.");
  }

  const dto = bodyToUpdateUser(body);
  const updated = await updateUserById(userId, dto);

  return userToResponse(updated);
};