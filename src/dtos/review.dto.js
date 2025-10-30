export const bodyToReview = (body) => {
  return {
    userId: body.userId,
    storeId: body.storeId,
    content: body.content,
    star: body.star,
    imageUrl: body.imageUrl || null,
  };
};

export const responseFromReview = (review) => {
  return {
    id: review.id,
    userId: review.user_id,
    storeId: review.store_id,
    content: review.content,
    star: review.star,
    imageUrl: review.imageUrl,
    createdAt: review.created_at,
    updatedAt: review.updated_at,
  };
};