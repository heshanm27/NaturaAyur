import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Stack } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface ProductProps {
  productName: string;
  productPrice: string;
  productCode: string;
  productID: string;
  productImg: string;
}

export default function ProductCard({ productCode, productID, productImg, productName, productPrice }: ProductProps) {
  return (
    <Card sx={{ width: 280, height: "auto", maxHeight: 380, minHeight: 380 }}>
      <CardMedia component="img" height="200" image={productImg} alt="Paella dish" />
      <CardContent sx={{ height: 120 }}>
        <Typography component={"p"} color="text.secondary" style={{ fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.5em" }}>
          {productName}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{`$${productPrice}`}</Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Button variant="outlined">Buy Now</Button>
          <Button variant="contained" startIcon={<ShoppingCartIcon />}>
            Add Cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
