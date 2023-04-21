import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField() {
  return (
    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Products" inputProps={{ "aria-label": "search products" }} />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
