export const createUserMissionDto = (body) => ({
  userId: body.userId,
  missionId: body.missionId,
});


export const responseFromUserMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};