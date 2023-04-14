import { Box, Button, Container, IconButton, Tooltip, Typography, Chip } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { Edit } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import CustomeDialog from "../../../components/common/CustomDialog/CustomDialog";
import AddCategoryForm from "../../../components/common/form/addCategoryForm/AddCategoryForm";
import { fetchAllUsers } from "../../../api/userApi";
export default function UserManagmentPage() {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["categories"], queryFn: fetchAllUsers });
  console.log(data);

  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorFn: (row: any) => row.firstName + " " + row.lastName, //access nested data with dot notation
        header: "First Name",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Email",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "isVerified", //access nested data with dot notation
        header: "Verified",
        enableGlobalFilter: true,
        Cell: ({ renderedCellValue, row }: any) => {
          return row.original.isVerified ? <Chip label="Verified" color="primary" /> : <Chip label="Unverified" color="warning" />;
        },
      },
      {
        accessorKey: "role", //access nested data with dot notation
        header: "User Role",
        enableGlobalFilter: true,
        Cell: ({ renderedCellValue, row }: any) => {
          switch (row.original.role) {
            case "admin":
              return <Chip label="Admin" color="error" />;
            case "seller":
              return <Chip label="User" color="warning" />;
            default:
              return <Chip label="User" color="primary" />;
          }
        },
      },
    ],
    []
  );
  console.log("isLoading", isLoading);
  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }}>
        User Managment
      </Typography>

      <MaterialReactTable
        positionActionsColumn="last"
        muiTopToolbarProps={{
          sx: {
            p: 2,
            justifyContent: "end",
          },
        }}
        localization={{
          noRecordsToDisplay: "No records to display",
        }}
        enableEditing
        onEditingRowSave={() => {}}
        onEditingRowCancel={() => {}}
        state={{
          isLoading,
          showAlertBanner: isError,
        }}
        rowCount={data?.users?.length ?? 0}
        columns={columns}
        data={data?.users ?? []}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      <CustomeDialog open={open} setOpen={setOpen} title={"Create new note"}>
        <AddCategoryForm />
      </CustomeDialog>
    </Container>
  );
}
