export const bodyToUser = (body) => {
  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: body.birth ? new Date(body.birth) : null,
    address: body.address,
    detailAddress: body.detailAddress,
    phoneNumber: body.phoneNumber,
    preferences: body.preferences || [],
  };
};

export const UserToResponse = (user, preferences) => {
  const preferCategoryNames = preferences.map(
    (p) => p.foodCategory?.name ?? ""
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferCategoryNames,
  };
};

// 요청 body → 업데이트용 데이터
export const bodyToUpdateUser = (body) => ({
  name: body.name,
  gender: body.gender,
  birth: body.birth ? new Date(body.birth) : undefined,
  address: body.address,
  detailAddress: body.detailAddress,
  phoneNumber: body.phoneNumber,
});

// DB 유저 → 응답 데이터
export const userToResponse = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  gender: user.gender,
  birth: user.birth,
  address: user.address,
  detailAddress: user.detailAddress,
  phoneNumber: user.phoneNumber,
});