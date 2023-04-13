import { Avatar, Typography, Stack } from "@mui/material";
import React from "react";

export default function PopularCard() {
  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Avatar
          alt="Remy Sharp"
          src="https://plus.unsplash.com/premium_photo-1661311816510-2d6f0573e634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          sx={{
            width: 150,
            height: 150,
            "&:hover": {
              boxShadow: " 20px 20px 40px rgba(0, 0, 0, 0.2)",
            },
          }}
        />
        <Typography>PopularCate</Typography>
      </Stack>
    </>
  );
}
