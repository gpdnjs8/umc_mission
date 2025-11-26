import { prisma } from "../../db.config.js";

export const getStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: Number(storeId) },
    include: {
      region: true,
      reviews: {
        include: { user: true },
      },
    },
  });

  return store || null;
};

export const insertReview = async (data) => {
  await prisma.userStoreReview.create({
    data: {
      user: { connect: { id: data.userId } }, 
      store: { connect: { id: data.storeId } }, 
      content: data.content,
      star: data.star,
      imageUrl: data.imageUrl || null,
    },
  });

  return { message: "리뷰 추가 성공" };
};

export const getAllUserReviews = async (userId, cursor=0) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      star: true,
      imageUrl: true,
      createdAt: true,
      storeId: true,
      store: {
        select: {
          id: true,
          name: true,
          thumbnail: true,
        },
      },
    },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};