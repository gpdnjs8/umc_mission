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