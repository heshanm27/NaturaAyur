import { Box, Button, Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchAllProductsForSeller } from "../../../api/productApi";
import { useAppSelector } from "../../../redux/redux-hooks";
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

export default function ProductsPage() {
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["products"], queryFn: fetchAllProductsForSeller });

  const [open, setOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "productCode", //access nested data with dot notation
        header: "Product Code",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "name",
        header: "Product Name",
      },
      {
        accessorKey: "price",
        header: "Product Price",
        Cell: ({ renderedCellValue, row }: any) => {
          return "$" + row.original.price.toFixed(2);
        },
      },
      {
        accessorKey: "stock",
        header: "Product Stock",
        Cell: ({ renderedCellValue, row }: any) => {
          return row.original.stock + " units";
        },
      },
    ],
    []
  );

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, mb: 5 }} fontWeight={"bold"}>
        Your Products
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
        rowCount={data?.products?.length ?? 0}
        columns={columns}
        data={data?.products ?? []}
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
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => setOpen(true)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color="secondary" onClick={() => navigate("/seller/products/add")} variant="contained">
            Add Product
          </Button>
        )}
      />
    </Container>
  );
}
