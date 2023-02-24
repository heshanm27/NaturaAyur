import { Box, Stack, useTheme, Typography, Button, Container } from "@mui/material";
import SummaryCard from "../../components/card/summarycard/summarycard";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function OrderView() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container maxWidth="xl">
      <Stack sx={{ mt: 3, mb: 3 }} direction={"row"} justifyContent={"space-between"} alignContent={"baseline"}>
        <Typography variant="h4">Order Number #2222222</Typography>
        <Stack spacing={2} direction={"row"}>
          <Button variant="contained" color="success">
            {" "}
            Approve
          </Button>
          <Button variant="contained" color="error">
            Reject
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2} direction={onlyLargeScreen ? "column" : "row"} justifyContent="space-around" alignItems="start">
        <Stack direction="column" spacing={2}>
          <SummaryCard width="1000px" height="450px" title="Order Detils" />
          <SummaryCard width="1000px" height="290px" title="Customer And Order Details" />
        </Stack>
        <Stack direction="column" spacing={3}>
          <SummaryCard width="500px" height="100px" title="CourierDetails" />
          <SummaryCard width="500px" height="280px" title="Order Summary" />
          <SummaryCard width="500px" height="60px" title="total" />
          <SummaryCard width="500px" height="240px" title="total" />
        </Stack>
      </Stack>
    </Container>
  );
}
