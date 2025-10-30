export const CreateMissionDTO = (data) => {
  return {
    storeId: data.storeId,
    status: data.status || "pending",
    content: data.content,
    deadline: data.deadline,
    point: data.point || 0
  };
};
