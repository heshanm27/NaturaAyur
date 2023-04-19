import { Container, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import SummaryCard from "../../components/card/summarycard/summarycard";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLiverOrders } from "../../api/liverOrderApi";
import { Delete, Edit } from "@mui/icons-material";
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

export default function LiveOrder() {
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["liveorders"], queryFn: fetchAllLiverOrders });
  const [open, setOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "#ID",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "name.lastName",
        header: "Customer Name",
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Date",
      },
      {
        accessorKey: "city",
        header: "Status",
      },
      {
        accessorKey: "state",
        header: "Total Amount",
      },
      {
        accessorKey: "state",
        header: "Payment",
      },
    ],
    []
  );

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography sx={{ mt: 5 }}>Live Order</Typography>
      <Stack sx={{ mt: 5 }} direction={"row"} justifyContent={"space-between"} spacing={5}>
        <SummaryCard height="180px" width="400px" />
        <SummaryCard height="180px" width="400px" />
        <SummaryCard height="180px" width="400px" />
      </Stack>
      <Typography sx={{ mt: 5, mb: 5 }}>Order</Typography>
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
        rowCount={data?.categories.length ?? 0}
        columns={columns}
        data={data?.categories ?? []}
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
          <Button color="secondary" onClick={() => setOpen(true)} variant="contained">
            Add Category
          </Button>
        )}
      />
    </Container>
  );
}
