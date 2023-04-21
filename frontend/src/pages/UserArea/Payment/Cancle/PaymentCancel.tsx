import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const PaymentCancel = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Cancel sx={{ fontSize: "6rem", color: "#f44336" }} />
      <Typography variant="h4" sx={{ mt: 2, mb: 4 }}>
        Payment Cancelled
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Back to Home
      </Button>
    </Box>
  );
};

export default PaymentCancel;
