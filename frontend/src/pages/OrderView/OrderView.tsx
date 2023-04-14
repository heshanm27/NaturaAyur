import {
  Box,
  Stack,
  useTheme,
  Typography,
  Button,
  Container,
  Divider,
} from "@mui/material";
import SummaryCard from "../../components/card/summarycard/summarycard";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function OrderView() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container maxWidth="xl">
      <Stack
        sx={{ mt: 3, mb: 3 }}
        direction={"row"}
        justifyContent={"space-between"}
        alignContent={"baseline"}
      >
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
      <Stack
        spacing={2}
        direction={onlyLargeScreen ? "column" : "row"}
        justifyContent="space-around"
        alignItems="start"
      >
        <Stack direction="column" spacing={2}>
          <SummaryCard width="1000px" height="450px" />
          <SummaryCard width="1000px" height="290px">
            <Typography variant="h6">Customer and Order Details</Typography>
            <Divider />
            <Stack mt={3} spacing={2}>
              <Typography variant="body1">Customer Name</Typography>
              <Divider />
              <Typography variant="body1">Customer Phone</Typography>
              <Divider />
              <Typography variant="body1">Order Status</Typography>
              <Divider />
              <Typography variant="body1">Customeer Note</Typography>
              <Divider />
            </Stack>
          </SummaryCard>
        </Stack>
        <Stack direction="column" spacing={3}>
          <SummaryCard width="500px" height="100px">
            <Typography variant="h6">Courier Details</Typography>
          </SummaryCard>
          <SummaryCard width="500px" height="280px">
            <Typography variant="h6" mt={1}>
              Order Summary
            </Typography>
            <Stack mt={2} ml={2} spacing={3}>
              <Typography variant="body1">Order created: </Typography>
              <Typography variant="body1">Order Time: </Typography>
              <Typography variant="body1">Sub Total: </Typography>
              <Typography variant="body1">Delivery Cost: </Typography>
            </Stack>
          </SummaryCard>
          <SummaryCard width="500px" height="60px">
            <Typography variant="h6">Total: </Typography>
          </SummaryCard>
          <SummaryCard width="500px" height="240px">
            <Typography mt={1} variant="h6">
              Delivery Address
            </Typography>
            <Stack mt={2} ml={2} spacing={3}>
              <Typography variant="body1">Address Line 1: </Typography>
              <Typography variant="body1">Building/ Apartment: </Typography>
              <Typography variant="body1">City: </Typography>
              <Typography variant="body1">Postal Code: </Typography>
            </Stack>
          </SummaryCard>
        </Stack>
      </Stack>
    </Container>
  );
}
