import { Box, Button, Container, Divider, Grid, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import Navbar from "../../../components/common/navbar/navbar";
import Footer from "../../../components/common/footer/Footer";
import SlideOneImg from "../../../assets/slider/Banner1.png";
import SlideTwoImg from "../../../assets/slider/ayurvedic-skin-cream-online_2048x.webp";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
// Example data set
const reviewData = {
  title: "Great product",
  ratings: [
    { rating: 1, votes: 0 },
    { rating: 2, votes: 0 },
    { rating: 3, votes: 0 },
    { rating: 4, votes: 3 },
    { rating: 5, votes: 5 },
  ],
  reviews: [
    { name: "John", rating: 5, review: "I absolutely love this product! It exceeded my expectations." },
    { name: "Sarah", rating: 4, review: "Great product! It works well and is easy to" },
    { name: "Michael", rating: 3, review: "It's an okay product. It gets the job done, but could be improved." },
    { name: "Emily", rating: 4.5, review: "I'm very happy with this product. It's reliable and efficient." },
    // Add more reviews here...
  ],
};
var items = [
  {
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
    img: SlideOneImg,
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
    img: SlideTwoImg,
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
    img: SlideTwoImg,
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
    img: SlideTwoImg,
  },
];

export default function ProductView() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ImageGallery items={images} thumbnailPosition="bottom" showFullscreenButton={false} showNav={false} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: "410px" }}>
              <Stack direction="column" justifyContent="start" alignItems="start" spacing={2}>
                <Typography variant="h6" align="left">
                  NEW!! Invicta Men's 43MM Pro Diver Quartz 3 Hand Blue Dial Gold-tone Watch
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Typography variant="body1" gutterBottom>
                    Avg rating:
                  </Typography>
                  <Rating name="avg-rating" precision={0.5} value={5} readOnly sx={{ my: 1 }} />
                </Stack>
                <Typography variant="h6" align="left">
                  Price:{" "}
                  <Typography component="span" sx={{ ml: 1 }}>
                    US $59.95
                  </Typography>
                </Typography>

                <Typography variant="h6" gutterBottom></Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Typography variant="h6" component="span" sx={{ mr: 1, textAlign: "center" }}>
                    Quantity:
                  </Typography>
                  <TextField type="number" inputProps={{ min: 1 }} size="small" />
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    10 available / 6 sold
                  </Typography>
                </Stack>

                {/* <IconButton color="secondary" onClick={handleShareClick}>
        <ShareIcon />
      </IconButton> */}
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 5 }} spacing={2} width={"100%"}>
                <Button variant="contained" color="primary" sx={{ mb: 1, width: "50%" }}>
                  Add to Cart
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Box p={2}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">About this product</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography>
              Hello, and thank you for your kind words. I have given this idea some thought in the past, and I'm not sure if it would be wise to implement it.
              You see, this carousel is built to "host" anything inside it, from simple <img /> to complicated components with tables and buttons. The question
              then becomes, how do you create the thumbnails, and what do you display inside them, given that the carousel size and content is variable? The
              answer to that question is not obvious. I was thinking of creating another library that implements an image gallery, that works similarly to this
              one, but that's not something that is currently on my roadmap.
            </Typography>
          </Paper>
          {/* Add review and rating */}

          <Paper sx={{ p: 2, mt: 5, mb: 5 }}>
            <Stack direction={"column"} spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h6">Rate this product</Typography>
                <Rating
                  name="rating"
                  // value={rating}
                  // onChange={(event, newValue) => {
                  //   handleRatingChange(newValue);
                  // }}
                />
              </Stack>
              <TextField label="Add Review" multiline rows={4} fullWidth />
              <Box mt={2} display="flex" justifyContent="end">
                <Button variant="contained" color="primary" onClick={() => {}}>
                  Submit Your Review
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>

        <ProductReview title={reviewData.title} ratings={reviewData.ratings} reviews={reviewData.reviews} />
      </Container>
      <Footer />
    </>
  );
}
interface ReviewItem {
  name: string;
  review: string;
  rating: number;
}

interface ProductReviewProps {
  title: string;
  ratings: { rating: number; votes: number }[];
  reviews: ReviewItem[];
}

const ProductReview: React.FC<ProductReviewProps> = ({ title, ratings, reviews }) => {
  // Group reviews by rating in the same range (1-5)
  const reviewsByRating: { [key: number]: ReviewItem[] } = {};
  reviews.forEach((review) => {
    const rating = Math.floor(review.rating);
    if (!reviewsByRating[rating]) {
      reviewsByRating[rating] = [];
    }
    reviewsByRating[rating].push(review);
  });

  // Display up to 10 reviews
  const displayedReviews = reviews.slice(0, 10);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction={{ md: "row", sm: "column" }} justifyContent="space-around" alignItems={{ md: "start", sm: "center" }} spacing={2}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ mt: 1 }}>
            {ratings.map(({ rating, votes }, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Rating value={rating} max={5} precision={0.5} readOnly />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  ({votes} {votes === 1 ? "vote" : "votes"})
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
          {displayedReviews.map(({ name, review, rating }, index) => (
            <Box key={index} sx={{ mt: index > 0 ? 2 : 0 }}>
              <Typography variant="subtitle1">{name}</Typography>
              <Rating value={rating} max={5} precision={0.5} readOnly />
              <Typography variant="body1">{review}</Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Paper>
  );
};
function Item(props: any) {
  return (
    <Paper style={{ height: "500px", cursor: "pointer", pointerEvents: "none", borderRadius: "10px" }}>
      <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
        {/* <Box width={"50%"} height={"300px"} sx={{ backgroundColor: "black" }}>
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
        </Box> */}
        <Box sx={{ p: 0 }}>
          <img src={props.item.img} alt="" style={{ height: "500px", width: "100%", zIndex: -1, objectFit: "cover", borderRadius: "10px" }} />
        </Box>
      </Stack>
    </Paper>
  );
}
