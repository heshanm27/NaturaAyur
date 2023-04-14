import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import AddProductForm from "../../components/common/form/addProductForm/addProductForm";

export default function AddProduct() {
  return (
    <Container maxWidth="lg">
      <Box>
        <Typography>Add New Product</Typography>
      </Box>

      <Stack>
        <AddProductForm />
      </Stack>
    </Container>
  );
}
