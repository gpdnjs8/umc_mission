import { prisma } from "../../db.config.js";

export const getNextStoreId = async () => {
  const lastStore = await prisma.store.findFirst({
    orderBy: { id: "desc" },
    select: { id: true },
  });
  return (lastStore?.id || 0) + 1;
};


export const insertStore = async (data) => {
  const store = await prisma.store.create({
    data: {
      name: data.name,
      number: data.number || null,
      thumbnail: data.thumbnail || null,
      work_time: data.work_time || null,
      address: data.address || null,
      region: {
        connect: { id: data.region_id }, 
      },
    },
    select: {
      id: true,
      name: true,
      region: true,
    },
  });

  return store;
};


export const getStoreById = async (id) => {
  const store = await prisma.store.findUnique({
    where: { id },
    include: {
      region: true, 
    },
  });

  return store;
};


export const getAllStoreReviews = async (storeId, cursor=0) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

export const getRegionById = async (id) => {
  return await prisma.region.findUnique({
    where: { id },
  });
};