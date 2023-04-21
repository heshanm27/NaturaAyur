import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, CircularProgress, useTheme } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
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
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: "30px" }}>
            Payment Completed Successful!
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: "16px" }}>
            Thank you for your purchase!
          </Typography>
          <Button sx={{ my: 2 }} variant="contained" color="primary" href="/">
            Back to Home
          </Button>
          <p>You will be redirected with in 10 seconds.</p>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;
