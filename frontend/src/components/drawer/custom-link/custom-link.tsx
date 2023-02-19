import { ListItemButton, ListItemText, Tooltip, Typography, ListItem, ListItemIcon, useTheme } from "@mui/material";
import { pascalCase } from "change-case";
import { ReactNode } from "react";
type CustomLinkProps = {
  label: string;
  handleClick: () => void;
  icon: ReactNode;
};
export default function CustomLink({ label, icon, handleClick }: CustomLinkProps) {
  const theme = useTheme();
  return (
    <Tooltip title={label} placement="right" arrow>
      <ListItem
        sx={{
          p: 0,
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
          borderRadius: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <Typography
              sx={{
                color: "#000000",
                fontSize: 18,
              }}
            >
              {pascalCase(label)}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
