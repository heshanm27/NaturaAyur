import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function CustomCirculerProgress() {
  return (
    <Box sx={{ height: "100vh", justifyContent: "center", display: "flex", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}
