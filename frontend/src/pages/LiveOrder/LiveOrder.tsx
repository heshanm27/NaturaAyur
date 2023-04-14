import { Container, Grid, Stack, Typography } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import React, { useMemo } from "react";
import SummaryCard from "../../components/card/summarycard/summarycard";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
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
  const data: Person[] = [
    {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      address: "261 Erdman Ford",
      city: "East Daphne",
      state: "Kentucky",
    },
    {
      name: {
        firstName: "Jane",
        lastName: "Doe",
      },
      address: "769 Dominic Grove",
      city: "Columbus",
      state: "Ohio",
    },
    {
      name: {
        firstName: "Joe",
        lastName: "Doe",
      },
      address: "566 Brakus Inlet",
      city: "South Linda",
      state: "West Virginia",
    },
    {
      name: {
        firstName: "Kevin",
        lastName: "Vandy",
      },
      address: "722 Emie Stream",
      city: "Lincoln",
      state: "Nebraska",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Omaha",
      state: "Nebraska",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Omaha",
      state: "Nebraska",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Omaha",
      state: "Nebraska",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Omaha",
      state: "Nebraska",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Omaha",
      state: "Nebraska",
    },
  ];
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],
    []
  );

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Typography sx={{ mt: 5 }}>Live Order</Typography>
      <Stack
        sx={{ mt: 5 }}
        direction={"row"}
        justifyContent={"space-between"}
        spacing={5}
      >
        <SummaryCard height="180px" width="400px">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ListAltIcon fontSize="large" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h1">50</Typography>
              <Typography variant="h5">Total Orders</Typography>
            </Grid>
          </Grid>
        </SummaryCard>
        <SummaryCard height="180px" width="400px">
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <PendingActionsIcon fontSize="large" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h1">20</Typography>
              <Typography variant="h5">Pending Orders</Typography>
            </Grid>
          </Grid>
        </SummaryCard>
        <SummaryCard height="180px" width="400px">
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <FiberNewIcon fontSize="large" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h1">30</Typography>
              <Typography variant="h5">New Orders</Typography>
            </Grid>
          </Grid>
        </SummaryCard>
      </Stack>
      <Typography sx={{ mt: 5, mb: 5 }}>Order</Typography>
      <MaterialReactTable columns={columns} data={data} />
    </Container>
  );
}
