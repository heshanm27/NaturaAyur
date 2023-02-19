import { ListItemButton, ListItemText, Tooltip, Typography, ListItem, ListItemIcon, useTheme } from "@mui/material";
import { pascalCase } from "change-case";
import { ReactNode } from "react";
type CustomLinkProps = {
  label: string;
  handleClick: () => void;
  icon: ReactNode;
  drawerStatus: boolean;
};
export default function CustomLink({ drawerStatus, label, icon, handleClick }: CustomLinkProps) {
  const theme = useTheme();
  return (
    <Tooltip title={label} placement="right" arrow>
      <ListItem
        sx={{
          p: 0,
          mt: 8,
          width: "80%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ListItemButton
          sx={{
            backgroundColor: "#E9FBCD",
            display: "flex",
            flexDirection: "row",
            alignContent: "space-between",
            justifyContent: "space-between",
            borderRadius: theme.spacing(1),
          }}
          onClick={handleClick}
        >
          <ListItemIcon sx={{ color: "#66A700", minWidth: "auto" }}>{icon}</ListItemIcon>
          {drawerStatus ? (
            <ListItemText>
              <Typography
                sx={{
                  color: "#66A700",
                  fontSize: 18,
                }}
              >
                {pascalCase(label)}
              </Typography>
            </ListItemText>
          ) : null}
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
