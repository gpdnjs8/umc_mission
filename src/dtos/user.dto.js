export const bodyToUser = (body) => {
  const {
    email,
    name,
    gender,
    birth,
    address,
    detailAddress,
    phoneNumber,
    preferences = [],
  } = body;

  return {
    email,
    name,
    gender,
     birth: new Date(birth),
    address,
    detailAddress,
    phoneNumber,
    preferences,
  };
};