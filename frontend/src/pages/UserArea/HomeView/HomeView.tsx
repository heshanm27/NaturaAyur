import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import SlideOneImg from "../../../assets/slider/Banner1.png";
import SlideTwoImg from "../../../assets/slider/ayurvedic-skin-cream-online_2048x.webp";
import Navbar from "../../../components/common/navbar/navbar";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import PopularCard from "../../../components/card/PopularCard/PopularCard";
import ProductCard from "../../../components/card/ProductCard/ProductCard";
import Grid from "@mui/material/Grid";
import Footer from "../../../components/common/footer/Footer";
export default function HomeView() {
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

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
        <Box sx={{ maxHeight: "330px" }}>
          <Carousel
            animation="slide"
            cycleNavigation={true}
            NextIcon={<ArrowCircleRightIcon />}
            PrevIcon={<ArrowCircleLeftIcon />}
            swipe={true}
            indicators={false}
            fullHeightHover={true}
            autoPlay={true}
            navButtonsWrapperProps={{
              style: {},
            }}
            navButtonsProps={{
              style: {
                backgroundColor: "white",
                color: "#494949",
                borderRadius: "50%",
              },
            }}
          >
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Popular Categories
          </Typography>
          <Grid container spacing={2} alignContent={"center"}>
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <Grid item xs={6} md={4} lg={2}>
                <PopularCard />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Popular Products
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <Grid item xs={6} md={4} lg={3}>
                <ProductCard />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
            Top Brands
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <Grid item xs={6} md={4} lg={3}>
                <ProductCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

function Item(props: any) {
  return (
    <Paper style={{ height: "300px", cursor: "pointer", pointerEvents: "none" }}>
      <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
        {/* <Box width={"50%"} height={"300px"} sx={{ backgroundColor: "black" }}>
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
        </Box> */}
        <Box sx={{ p: 0 }}>
          <img src={props.item.img} alt="" style={{ height: "300px", width: "100%", zIndex: -1, objectFit: "cover" }} />
        </Box>
      </Stack>
    </Paper>
  );
}