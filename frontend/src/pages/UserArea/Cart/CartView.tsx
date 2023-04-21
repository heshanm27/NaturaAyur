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
  IconButton,
  CircularProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SummaryCard from "../../../components/card/summarycard/summarycard";
import Navbar from "../../../components/common/navbar/navbar";
import Footer from "../../../components/common/footer/Footer";
import { useAppDispatch, useAppSelector } from "../../../redux/redux-hooks";
import { IItem } from "../../../redux/cartslice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { decreaseQuantity, increaceQuantity, removeFromCart, clearCart } from "../../../redux/cartslice";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useNavigate } from "react-router-dom";
import EmptyCartSVG from "../../../assets/images/emptycart.svg";
import CustomeDialog from "../../../components/common/CustomDialog/CustomDialog";
import { useState } from "react";
import ChangeAddressForm from "../../../components/common/form/changeAddressForm/ChangeAddressForm";
import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../../../api/orderApi";
import CustomSnackBar from "../../../components/common/snackbar/Snackbar";

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
  const [open, setOpen] = useState(false);

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
      <Box mt={2} sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Change Address
        </Button>
      </Box>

      <CustomeDialog title="Change address" open={open} setOpen={setOpen}>
        <ChangeAddressForm />
      </CustomeDialog>
    </Box>
  );
};

interface Props {
  cartItems: IItem[];
  onRemove: (itemId: number) => void;
  onIncrease: (itemId: number) => void;
  onDecrease: (itemId: number) => void;
}

const CartTable: React.FC<Props> = ({ cartItems, onRemove, onIncrease, onDecrease }) => {
  const dispatch = useAppDispatch();
  const handleRemove = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncrease = (itemId: string) => {
    dispatch(increaceQuantity(itemId));
  };

  const handleDecrease = (itemId: string) => {
    dispatch(decreaseQuantity(itemId));
  };

  console.log(cartItems);
  return (
    <TableContainer component={Paper} style={{ maxHeight: "auto", overflowY: "auto" }}>
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
          {cartItems.map((item: any) => (
            <TableRow key={item._id}>
              <TableCell sx={{ display: "flex", justifyContent: "left", alignItems: "start", flexDirection: "column" }}>
                <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", borderRadius: "10px", margin: "5px" }} />
                <Typography
                  variant="caption"
                  align="left"
                  sx={{ width: "120px", height: "40px", overflow: "hidden", textOverflow: "ellipsis", lineHeight: "1.5em" }}
                >
                  {item.name}
                </Typography>
              </TableCell>
              <TableCell align="right">${item.price.toFixed(2)}</TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => handleDecrease(item._id)} disabled={item.quantity === 1}>
                  -
                </Button>
                {item.quantity}
                <Button size="small" onClick={() => handleIncrease(item._id)}>
                  +
                </Button>
              </TableCell>
              <TableCell align="right">{(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <IconButton size="small" color="error" onClick={() => handleRemove(item._id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cartItems.length === 0 && (
        <Box p={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <img src={EmptyCartSVG} alt="Empty Cart" style={{ width: "60px", height: "auto" }} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            No items in the cart.
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};

export default function CartView() {
  const theme = useTheme();
  const { items, total } = useAppSelector((state) => state.cartSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { mutate, isLoading, error } = useMutation({
    mutationFn: addOrder,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const handleCheckout = () => {
    // if (items.length === 0) {
    //   setNotify({
    //     isOpen: true,
    //     message: "No items in the cart",
    //     title: "Error",
    //     type: "error",
    //   });
    //   return;
    // }
    mutate(items);
    // dispatch(clearCart());
  };
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ pl: 5, pr: 5 }} variant="h5" align="left" color={theme.palette.primary.main}>
            Your Cart
          </Typography>
          <Button
            startIcon={<ClearAllIcon />}
            color="error"
            onClick={() => {
              dispatch(clearCart());
              navigate("/list");
            }}
          >
            Clear Cart
          </Button>
        </Stack>

        <Divider sx={{ mb: 2, mt: 2 }} />
        <Stack spacing={2} direction={onlyLargeScreen ? "column" : "row"} justifyContent="space-around" alignItems="start">
          <Stack direction="column">
            <Paper>
              <Box width="600px" height="auto">
                <Stack direction="row" justifyContent={"space-between"}>
                  <CartTable cartItems={items} onDecrease={() => {}} onIncrease={() => {}} onRemove={() => {}} />
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
              <TotalBox total={total} tax={10.0} />
            </SummaryCard>
            <Button variant="contained" color="primary" size="large" fullWidth onClick={handleCheckout}>
              {isLoading ? <CircularProgress /> : "Check Out"}
            </Button>
          </Stack>
        </Stack>
      </Container>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
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
