import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, CircularProgress, useTheme } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteOrder } from "../../../../api/orderApi";
import { useAppDispatch, useAppSelector } from "../../../../redux/redux-hooks";
import { clearOrder } from "../../../../redux/orderslice";

const PaymentCancel = () => {
  const theme = useTheme();
  const { orderID } = useAppSelector((state) => state.orderSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      dispatch(clearOrder());
    },
  });

  useEffect(() => {
    mutate(orderID);
    const redirectTimeout = setTimeout(() => {
      navigate("/list", { replace: true });
    }, 10000);

    return () => clearTimeout(redirectTimeout);
  }, []);
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <CheckCircleOutline sx={{ fontSize: "4rem", color: "#4caf50" }} />
          <Typography variant="body2" color={theme.palette.error.main} sx={{ fontSize: "30px" }}>
            Payment Faild
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: "16px" }}>
            Unfortunately, your payment was not successful. Please try again.
          </Typography>
          <Button sx={{ my: 2 }} variant="contained" color="error" href="/">
            Back to Home
          </Button>
          <p>You will be automatically redirected with in 10 seconds.</p>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentCancel;
