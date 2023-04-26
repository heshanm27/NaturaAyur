import Reviews, { IReview } from "../models/review.model";

interface IFilters {
  sortBy?: any;
  order?: any;
  limit?: any;
  page?: any;
  productId?: string;
  sellerId?: string;
}

export async function addReviewForProduct(input: Omit<IReview, "_id" | "isEdited">) {
  try {
    const review = await Reviews.create({
      user: input.user,
      product: input.product,
      rating: input.rating,
      comment: input.comment,
    });

    return {
      message: "Review Added Successfully",
      review,
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function addReviewForSeller(input: Omit<IReview, "_id" | "isEdited" | "product">) {
  try {
    const review = await Reviews.create({
      user: input.user,
      seller: input.seller,
      rating: input.rating,
      comment: input.comment,
    });

    return {
      message: "Review Added Successfully",
      review,
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function findAllReviewsForProduct({ sortBy = "rating", order = "-1", limit = "2", page = "1", productId }: IFilters): Promise<{
  reviews: any;
  total: number;
  maximumReviewRate: number;
  minimumReviewsRate: number;
  avgRating: number;
}> {
  //find all reviews
  const reviews = await Reviews.find({
    product: productId,
  })
    .sort({
      [sortBy]: order,
    })
    .limit(limit)
    .skip(limit * (page - 1));

  //find count for matching reviews
  const totalDocCount = await Reviews.countDocuments()
    .sort({
      [sortBy]: order,
    })
    .count();

  const total = Math.ceil(totalDocCount / limit);
  const maxReview = await Reviews.findOne()
    .sort({ rating: -1 }) // Sort by "rating" field in descending order to get maximum value
    .select("rating") // Select only the "rating" field
    .exec();

  const minReview = await Reviews.findOne()
    .sort({ rating: 1 }) // Sort by "rating" field in ascending order to get minimum value
    .select("rating") // Select only the "rating" field
    .exec();
  const maximumReviewRate = maxReview ? maxReview.rating : 0;
  const minimumReviewsRate = minReview ? minReview.rating : 0;

  const avgRating = await Reviews.aggregate([
    {
      $match: {
        productId: productId,
      },
    },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
      },
    },
  ]).exec();
  return { reviews, total, maximumReviewRate, minimumReviewsRate, avgRating: avgRating[0].avgRating };
}

export async function findAllReviewsForSeller({ sortBy = "rating", order = "-1", limit = "2", page = "1", sellerId }: IFilters): Promise<{
  reviews: any;
  total: number;
  maximumReviewRate: number;
  minimumReviewsRate: number;
  avgRating: number;
}> {
  //find all reviews
  const reviews = await Reviews.find({
    seller: sellerId,
  })
    .sort({
      [sortBy]: order,
    })
    .limit(limit)
    .skip(limit * (page - 1));

  //find count for matching reviews
  const totalDocCount = await Reviews.countDocuments()
    .sort({
      [sortBy]: order,
    })
    .count();

  const total = Math.ceil(totalDocCount / limit);
  const maxReview = await Reviews.findOne()
    .sort({ rating: -1 }) // Sort by "rating" field in descending order to get maximum value
    .select("rating") // Select only the "rating" field
    .exec();

  const minReview = await Reviews.findOne()
    .sort({ rating: 1 }) // Sort by "rating" field in ascending order to get minimum value
    .select("rating") // Select only the "rating" field
    .exec();
  const maximumReviewRate = maxReview ? maxReview.rating : 0;
  const minimumReviewsRate = minReview ? minReview.rating : 0;

  const avgRating = await Reviews.aggregate([
    {
      $match: {
        seller: sellerId,
      },
    },
    {
      $group: {
        _id: "$seller",
        avgRating: { $avg: "$rating" },
      },
    },
  ]).exec();
  return { reviews, total, maximumReviewRate, minimumReviewsRate, avgRating: avgRating[0].avgRating };
}

export async function getReviewById(id: string) {
  try {
    const review = await Reviews.findById(id);
    return review;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateReview(id: string) {
  try {
    const review = await Reviews.findById(id);
    return review;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
