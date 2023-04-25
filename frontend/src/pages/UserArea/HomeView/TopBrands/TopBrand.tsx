import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { fetchAllProductsForSeller, getPopularProducts } from "../../../../api/productApi";
import ProductCard from "../../../../components/card/ProductCard/ProductCard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SkeltonCard from "../../../../components/card/SkeltonCard/SkeltonCard";
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
export default function TopBrand() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-brand"],
    queryFn: getPopularProducts,
  });
  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction={"row"} justifyContent={"start"} alignItems={"baseline"} spacing={2} mb={2}>
        <AutoAwesomeIcon color="error" />
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }} fontWeight={"bold"}>
          Top Brand
        </Typography>
      </Stack>

      <Slider {...settings}>
        {isLoading
          ? [1, 2, 3, 4, 5].map(() => <SkeltonCard />)
          : data?.popularProducts?.map((item: any) => (
              <ProductCard
                productCode={item?.productCode}
                productID={item._id}
                productImg={item.images[0]}
                productName={item.name}
                productPrice={item.price}
                productStock={item.stock}
              />
            ))}
      </Slider>
    </Box>
  );
}
