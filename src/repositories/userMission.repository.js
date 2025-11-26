import { prisma } from "../../db.config.js";

export const insertUserMission = async (data) => {
  const userMission = await prisma.userMission.create({
    data: {
      user: { connect: { id: data.userId } },
      mission: { connect: { id: data.missionId } },
      status: "in_progress", 
    },
  });

  return userMission.id;
};

export const getUserMissionById = async (id) => {
  return await prisma.userMission.findUnique({
    where: { id: id },
  });
};

export const getUserMission = async (userId, missionId, status = null) => {
  const whereClause = {
    userId: userId,
    missionId: missionId,
  };
  if (status) {
    whereClause.status = status; 
  }

  return await prisma.userMission.findFirst({
    where: whereClause,
  });
};

export const getUserMissionsInProgress = async (userId, cursor=0) => {
  const missions = await prisma.userMission.findMany({
    where: {
      userId,
      status: "in_progress",
      id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};
