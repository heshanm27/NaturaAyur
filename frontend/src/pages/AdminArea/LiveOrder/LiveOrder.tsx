import { Box, Button, Container, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import SummaryCard from "../../../components/card/summarycard/summarycard";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchAllLiveOrders } from "../../../api/orderApi";
import DetailsCard from "../../../components/card/DetailsCard/DetailsCard";
import { faEnvelope, faClipboardCheck, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

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
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-live-orders"], queryFn: fetchAllLiveOrders });

  const [open, setOpen] = useState(false);
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "orderId", //access nested data with dot notation
        header: "#ID",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "name.lastName",
        header: "Customer Name",
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Date",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "totalPrice",
        header: "Total Amount",
      },
      {
        accessorKey: "isPaid",
        header: "Payment",
      },
    ],
    []
  );

  const DetailsCardList = [
    {
      Icon: faEnvelope,
      value: data?.ordersReceivedToday ?? 0,
      title: "Orders Received Today",
      color: "#f0f4c3",
    },
    {
      Icon: faClipboardCheck,
      value: data?.pendingOrders ?? 0,
      title: "Pending Orders",
      color: "#fff9c4",
    },
    {
      Icon: faBoxesStacked,
      value: data?.newOrders ?? 0,
      title: "New Orders",
      color: "#ffcdd2",
    },
  ];
  console.log(data);
  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mt: 5, fontWeight: "bold" }}>
        Live Order
      </Typography>
      <Grid container spacing={5} sx={{ mt: 5, mb: 5 }} justifyContent={"space-around"}>
        {DetailsCardList.map((item, index) => {
          return (
            <Grid item xs={4} lg={3}>
              <DetailsCard Icon={item.Icon} value={item.value} title={item.title} color={item.color} />
            </Grid>
          );
        })}
      </Grid>

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
        rowCount={data?.orders.length ?? 0}
        columns={columns}
        data={data?.orders ?? []}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error occured while loading data",
              }
            : undefined
        }
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </Container>
  );
}
