import { Box, Paper, Typography } from "@mui/material";
import React from "react";

interface Iprop {
  title: string;
  width: string;
  height: string;
}
export default function SummaryCard({ title, height, width }: Iprop) {
  return (
    <Paper>
      <Box sx={{ width: width, height: height }}>
        <Typography>{title}</Typography>
      </Box>
    </Paper>
  );
}
