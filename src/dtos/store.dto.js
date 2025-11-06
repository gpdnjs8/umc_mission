export const bodyToStore = (body) => ({
  region_id: body.region_id,
  name: body.name,
  number: body.number,
  thumbnail: body.thumbnail,
  work_time: body.work_time,
  region: body.region,
  address: body.address,
});

export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};