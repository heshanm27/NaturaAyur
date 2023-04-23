import { Box, Button, Chip, Container, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import SummaryCard from "../../../components/card/summarycard/summarycard";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchAllLiveOrders } from "../../../api/orderApi";
import DetailsCard from "../../../components/card/DetailsCard/DetailsCard";
import { faEnvelope, faClipboardCheck, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

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
        accessorFn: (row: any) => row.user.firstName + " " + row.user.lastName, //access nested data with dot notation
        header: "Customer Name",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Date",
        Cell: ({ renderedCellValue, row }: any) => {
          return new Date(row.original.createdAt).toLocaleDateString();
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ renderedCellValue, row }: any) => {
          switch (row.original.status) {
            case "new":
              return <Chip label="New" color="error" />;
            case "approved":
              return <Chip label="Approved" color="success" />;
            case "rejected":
              return <Chip label="Rejected" color="error" />;
            case "delivered":
              return <Chip label="Delivered" color="success" />;
            default:
              return <Chip label="Pending" color="info" />;
          }
        },
      },
      {
        accessorKey: "totalPrice",
        header: "Total Amount",
      },
      {
        accessorKey: "isPaid",
        header: "Payment",
        Cell: ({ renderedCellValue, row }: any) => {
          return row.original.isPaid ? <Chip label="Paid" color="success" /> : <Chip label="Pending" color="error" />;
        },
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
      animate: true,
      iconColor: "#f44336",
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
              <DetailsCard Icon={item.Icon} value={item.value} title={item.title} color={item.color} animate={item.animate} iconColor={item.iconColor} />
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
