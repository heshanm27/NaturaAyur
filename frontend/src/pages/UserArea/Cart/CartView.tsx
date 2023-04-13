import {
  Box,
  Grid,
  Stack,
  useTheme,
  Typography,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SummaryCard from "../../../components/card/summarycard/summarycard";
import Navbar from "../../../components/common/navbar/navbar";
import Footer from "../../../components/common/footer/Footer";

const cartItems: CartItem[] = [
  {
    id: 1,
    product: "Product 1",
    price: 10.99,
    quantity: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1675431443185-9d40521c8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
  },
  {
    id: 2,
    product: "Product 2",
    price: 19.99,
    quantity: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1675431443185-9d40521c8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
  },
  {
    id: 3,
    product: "Product 3",
    price: 7.49,
    quantity: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1675431443185-9d40521c8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
  },
  {
    id: 3,
    product: "Product 3",
    price: 7.49,
    quantity: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1675431443185-9d40521c8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
  },
  {
    id: 3,
    product: "Product 3",
    price: 7.49,
    quantity: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1675431443185-9d40521c8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
  },
  {
    id: 3,
    product: "Product 3",
    price: 7.49,
    quantity: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1675431443185-9d40521c8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
  },
  {
    id: 3,
    product: "Product 3",
    price: 7.49,
    quantity: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1675431443185-9d40521c8d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
  },
];

const deliveryAddress = {
  houseNumber: "100",
  streetName: "Raja Veedia",
  addressLine1: "Address Line 1",
  building: "Chandrasekara Building",
  city: "Kandy",
  postalCode: "20900",
};

interface DeliveryAddress {
  houseNumber: string;
  streetName: string;
  addressLine1: string;
  building: string;
  city: string;
  postalCode: string;
}

interface DeliveryProps {
  deliveryAddress: DeliveryAddress;
}

const DeliveryDetails: React.FC<DeliveryProps> = ({ deliveryAddress }) => {
  return (
    <Box p={2} border={1} borderColor="grey.300" borderRadius={4}>
      <Typography variant="h6">Delivery Address</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="body1">
          No {deliveryAddress.houseNumber}, {deliveryAddress.streetName}
        </Typography>
        <Typography variant="body1">Address Line 1: {deliveryAddress.addressLine1}</Typography>
        <Typography variant="body1">Building/Apartment: {deliveryAddress.building}</Typography>
        <Typography variant="body1">City: {deliveryAddress.city}</Typography>
        <Typography variant="body1">Postal Code: {deliveryAddress.postalCode}</Typography>
      </Box>
    </Box>
  );
};

interface CartItem {
  id: number;
  product: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  cartItems: CartItem[];
  onRemove: (itemId: number) => void;
  onIncrease: (itemId: number) => void;
  onDecrease: (itemId: number) => void;
}

const CartTable: React.FC<Props> = ({ cartItems, onRemove, onIncrease, onDecrease }) => {
  const handleRemove = (itemId: number) => {
    onRemove(itemId);
  };

  const handleIncrease = (itemId: number) => {
    onIncrease(itemId);
  };

  const handleDecrease = (itemId: number) => {
    onDecrease(itemId);
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: "800px", overflowY: "auto" }}>
      <Table>
        <TableHead style={{ position: "sticky", top: 0, background: "white", zIndex: 1 }}>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <img src={item.image} alt={item.product} style={{ width: "60px", height: "60px", borderRadius: "10px", margin: "5px" }} />
                <Typography variant="caption" align="center">
                  {item.product}
                </Typography>
              </TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => handleDecrease(item.id)} disabled={item.quantity === 1}>
                  -
                </Button>
                {item.quantity}
                <Button size="small" onClick={() => handleIncrease(item.id)}>
                  +
                </Button>
              </TableCell>
              <TableCell align="right">{item.price * item.quantity}</TableCell>
              <TableCell>
                <Button size="small" color="secondary" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cartItems.length === 0 && (
        <Box p={2}>
          <Typography variant="body1">No items in the cart.</Typography>
        </Box>
      )}
    </TableContainer>
  );
};

export default function CartView() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography sx={{ pl: 5, pr: 5 }} variant="h5" align="left" color={theme.palette.primary.main}>
          Your Cart
        </Typography>
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Stack spacing={2} direction={onlyLargeScreen ? "column" : "row"} justifyContent="space-around" alignItems="start">
          <Stack direction="column">
            <Paper>
              <Box width="600px" height="auto">
                <Stack direction="row" justifyContent={"space-between"}>
                  <CartTable cartItems={cartItems} onDecrease={() => {}} onIncrease={() => {}} onRemove={() => {}} />
                </Stack>
              </Box>
            </Paper>
          </Stack>
          <Stack direction="column" justifyContent={"center"} alignItems={"center"} alignContent={"center"} spacing={3}>
            <SummaryCard width="400px" height="100px">
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" color={theme.palette.primary.main}>
                  Select Courier
                </Typography>
                <Divider />
                <Stack direction="row" justifyContent="left" alignItems="center" spacing={2}>
                  <img
                    src={
                      "https://images.unsplash.com/photo-1612810806563-4cb8265db55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                    }
                    alt="Product"
                    style={{ width: "40px", height: "40px", borderRadius: "10px", margin: "5px" }}
                  />
                  <Typography>Curior Name: DHL Lanka (pvt) ltd.</Typography>
                </Stack>
              </Box>
            </SummaryCard>
            <SummaryCard width="400px" height="auto">
              <DeliveryDetails deliveryAddress={deliveryAddress} />
            </SummaryCard>
            <SummaryCard width="400px" height="auto">
              <TotalBox total={100.0} tax={10.0} />
            </SummaryCard>
            <Button variant="contained" color="primary" size="large" fullWidth>
              Check Out
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

interface TotalBoxProps {
  total: number;
  tax: number;
}

const TotalBox: React.FC<TotalBoxProps> = ({ total, tax }) => {
  return (
    <Box p={2} border={1} borderColor="grey.300" borderRadius={4} display="flex" justifyContent="space-between" flexDirection={"column"}>
      <Typography variant="subtitle1">Order Summary</Typography>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="body1">Total:</Typography>
          <Typography variant="body1"> ${total.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="body1">Shipping Cost:</Typography>
          <Typography variant="body1"> ${tax.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="body1">Tax:</Typography>
          <Typography variant="body1"> ${tax.toFixed(2)}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};
