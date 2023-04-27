import Reviews, { IReview } from "../models/review.model";
import ProductSchema, { IProduct } from "../models/product.model";
interface IFilters {
  sortBy?: any;
  order?: any;
  limit?: any;
  page?: any;
  productId?: string;
  sellerId?: string;
}

export async function addReview(input: Omit<IReview, "_id" | "isEdited">) {
  try {
    console.log(input);

    const produt: any = await ProductSchema.findById(input.product);

    if (!produt) throw new Error("Product not found");

    const review = await Reviews.create({
      user: input.user,
      seller: input.seller,
      rating: input.rating,
      comment: input.comment,
      product: input.product,
    });

    produt.reviews.push(review._id);
    produt.numReviews = produt?.reviews.length;

    await produt.save();

    return {
      message: "Review Added Successfully",
      review,
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function findAllReviewsForProduct(
  id: string,
  { sortBy = "createdAt", order = "-1", limit = "2", page = "1", productId }: IFilters
): Promise<{
  reviews: any;
  total: number;
  maximumReviewRate: number;
  minimumReviewsRate: number;
  avgRating: number;
  rateData: any;
}> {
  //find all reviews
  const reviews = await Reviews.find({
    product: id,
  })
    .populate("user", { firstName: 1, lastName: 1 })
    .sort({
      [sortBy]: order,
    })
    .limit(10);

  //find count for matching reviews
  const totalDocCount = await Reviews.countDocuments({
    product: id,
  })
    .sort({
      [sortBy]: order,
    })
    .count();

  const total = totalDocCount;
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
  const rateData = await Reviews.aggregate([
    {
      $match: {
        productId: productId,
      },
    },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        rating: "$_id",
        count: 1,

        _id: 0,
      },
    },
    {
      $sort: {
        rating: 1,
      },
    },
  ]).exec();

  console.log(rateData);
  console.log(avgRating);
  return { reviews, total, maximumReviewRate, minimumReviewsRate, avgRating: avgRating[0]?.avgRating, rateData };
}

export async function findAllReviewsForSeller(
  id: string,
  { sortBy = "rating", order = "-1", limit = "2", page = "1", sellerId }: IFilters
): Promise<{
  reviews: any;
  total: number;
  maximumReviewRate: number;
  minimumReviewsRate: number;
  avgRating: number;
  rateData: any;
}> {
  //find all reviews
  const reviews = await Reviews.find({
    seller: id,
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

  const rateData = Reviews.aggregate([
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        rating: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: {
        rating: 1,
      },
    },
  ]);
  return { reviews, total, maximumReviewRate, minimumReviewsRate, avgRating: avgRating[0].avgRating, rateData };
}

export async function getReviewById(id: string) {
  try {
    const review = await Reviews.findById(id);
    return review;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateReview(id: string, data: any) {
  try {
    const review = await Reviews.findByIdAndUpdate(id, data, { new: true });
    return review;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
