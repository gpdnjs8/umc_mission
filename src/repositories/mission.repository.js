import { prisma } from "../../db.config.js";
import { StoreError } from "../../errors.js";

export const insertMission = async (data) => {
  const store = await prisma.store.findUnique({
    where: { id: Number(data.storeId) },
  });
  if (!store) {
    throw new StoreError("해당 가게가 존재하지 않습니다.", data);
  }

  const mission = await prisma.mission.create({
    data: {
      store: { connect: { id: data.storeId } },
      status: data.status || "pending",
      content: data.content,
      deadline: new Date(data.deadline),
      point: data.point || 0,
    },
  });

  return {
    id: mission.id,
    storeId: data.storeId,
    message: "미션 추가 성공",
  };
};

export const getMissionById = async (id) => {
  const mission = await prisma.mission.findUnique({
    where: { id: Number(id) },
    include: { store: true },
  });

  return mission || null;
};

export const getAllStoreMissions = async (storeId, cursor=0) => {
  const missions = await prisma.mission.findMany({
    where: { storeId: storeId, id: { gt: cursor },
    },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};