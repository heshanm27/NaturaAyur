import React from "react";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAppDispatch, useAppSelector } from "../../../redux/redux-hooks";
import { pascalCase } from "change-case";
import { logOut } from "../../../redux/auth/authslice";
import { useNavigate } from "react-router-dom";

export default function AvatarBtn() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { firstName, avatar } = useAppSelector((state) => state.authSlice);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hadnleLogout = () => {
    dispatch(logOut("logout"));
    navigate("/signin", { replace: true });
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        variant="text"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<Avatar alt="Remy Sharp" src={avatar} />}
        endIcon={<ArrowDropDownIcon />}
      >
        {pascalCase(firstName) || "User"}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={hadnleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
