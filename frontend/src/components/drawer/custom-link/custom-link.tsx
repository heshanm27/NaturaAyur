import { ListItemButton, ListItemText, Tooltip, Typography, ListItem, ListItemIcon, useTheme, Stack } from "@mui/material";
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
          m: 1,
          width: "auto",
        }}
      >
        <ListItemButton
          sx={{
            // backgroundColor: "#E9FBCD",
            borderRadius: theme.spacing(1),
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={handleClick}
        >
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
            <ListItemIcon
              sx={{
                // color: "#66A700",
                color: "#878787",
                minWidth: "auto",
              }}
            >
              {icon}
            </ListItemIcon>
            {drawerStatus ? (
              <ListItemText>
                <Typography
                  sx={{
                    // color: "#66A700"
                    color: "#878787",
                  }}
                >
                  {pascalCase(label)}
                </Typography>
              </ListItemText>
            ) : null}
          </Stack>
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
