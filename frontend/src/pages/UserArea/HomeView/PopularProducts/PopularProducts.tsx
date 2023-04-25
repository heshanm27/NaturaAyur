import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { fetchAllProductsForSeller } from "../../../../api/productApi";
import ProductCard from "../../../../components/card/ProductCard/ProductCard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NavigateNextIcon />,
  prevArrow: <ArrowBackIosIcon />,
};
export default function PopularProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["newarrivals"],
    queryFn: fetchAllProductsForSeller,
  });
  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction={"row"} justifyContent={"start"} alignItems={"baseline"} spacing={2} mb={2}>
        <AutoAwesomeIcon color="error" />
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }} fontWeight={"bold"}>
          Popular Products
        </Typography>
      </Stack>

      <Slider {...settings}>
        {data?.products?.map((item: any) => (
          <ProductCard productCode="" productID="" productImg="" productName="" productPrice={0} productStock={0} />
        ))}
      </Slider>
    </Box>
  );
}
