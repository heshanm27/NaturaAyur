import { Box, Stack, useTheme, Typography, Button, Container, Paper } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SummaryCard from "../../../components/card/summarycard/summarycard";

export default function CartView() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" align="left">
        Your Cart
      </Typography>
      <Stack spacing={2} direction={onlyLargeScreen ? "column" : "row"} justifyContent="space-around" alignItems="start">
        <Stack direction="column">
          <Paper>
            <Box width="600px" height="450px" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography>Item</Typography>
                <Typography>Quantity</Typography>
                <Typography>Price</Typography>
                <Typography>Total Price</Typography>
              </Stack>
            </Box>
          </Paper>
        </Stack>
        <Stack direction="column" spacing={3}>
          <SummaryCard width="400px" height="100px" title="CourierDetails" />
          <SummaryCard width="400px" height="280px" title="Order Summary" />
          <SummaryCard width="400px" height="60px" title="total" />
          <SummaryCard width="400px" height="240px" title="total" />
        </Stack>
      </Stack>
    </Container>
  );
}
