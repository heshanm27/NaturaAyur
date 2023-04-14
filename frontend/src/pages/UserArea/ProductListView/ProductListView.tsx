import React from "react";
import { Container, Grid, Paper, List, ListItem, Box, Typography, Slider, Stack } from "@mui/material";
import Navbar from "../../../components/common/navbar/navbar";
import Footer from "../../../components/common/footer/Footer";
const categories = ["All", "Shoes", "Clothing", "Accessories"];
const products = [
  { id: 1, name: "Product 1", category: "Shoes" },
  { id: 2, name: "Product 2", category: "Clothing" },
  { id: 3, name: "Product 3", category: "Accessories" },
  // Add more products here
];
const marks = [
  {
    value: 1,
    label: "USD 1",
  },
  {
    value: 100000,
    label: "USD 100000",
  },
];
export default function ProductListView() {
  function valuetext(value: number) {
    return `${value}USD`;
  }
  function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  const [minPrice, setMinPrice] = React.useState(1);
  const [maxPrice, setMaxPrice] = React.useState(10000);
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Grid container>
          <Grid>
            <Box sx={{ minHeight: "60vh", width: "200px" }}>
              <Typography>Shop by Category</Typography>
              <List>
                {categories.map((category) => (
                  <ListItem key={category}>{category}</ListItem>
                ))}
              </List>

              <Typography> FILTER BY BRANDS</Typography>
              <List>
                {categories.map((category) => (
                  <ListItem key={category}>{category}</ListItem>
                ))}
              </List>
              <Stack spacing={2}>
                <Typography> FILTER BY Price</Typography>
                <Slider
                  valueLabelFormat={valueLabelFormat}
                  getAriaValueText={valuetext}
                  value={0}
                  onChange={(event, newValue) => console.log(newValue)}
                  valueLabelDisplay="on"
                  min={minPrice}
                  max={maxPrice}
                  marks={marks}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
