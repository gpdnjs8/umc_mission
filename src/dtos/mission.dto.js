export const CreateMissionDTO = (data) => {
  return {
    storeId: data.storeId,
    status: data.status || "pending",
    content: data.content,
    deadline: data.deadline,
    point: data.point || 0
  };
};

export const responseFromMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};