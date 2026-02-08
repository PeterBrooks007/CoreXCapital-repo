import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { withdrawalCompleteEmail } from "../../redux/features/withdrawal/withdrawalSlice";
import LoadingScreen2 from "../../components/LoadingScreen";

const ConfirmWithdrawal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const walletAddress = searchParams.get("walletAddress");
  const amount = searchParams.get("amount");
  const method = searchParams.get("method");

  if (!walletAddress || !amount || !method) {
    navigate("/dashboard");
  }

  const { user } = useSelector((state) => state.auth);

  const { isLoading: withdrawalIsLoading } = useSelector(
    (state) => state.withdrawal,
  );
  const [code, setCode] = useState();

  const handleSubmit = async () => {
    console.log(code);

    if (!code) {
      return toast.error("Please Enter Withdrawal Code");
    }

    if (code == user?.withdrawalLocked?.lockCode) {
      if (user?.accountLock.upgradeLock === true) {
        return toast.error(
          "An Upgrade Is required to be able to complete the withdrawal process",
        );
      }

      const formData = {
        walletAddress,
        amount,
        method,
      };

      await dispatch(withdrawalCompleteEmail(formData));

      // toast.success("Withdrawal Request Successfull");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error("Wrong Withdrawal Code");
    }
  };

  if (withdrawalIsLoading) {
    return <LoadingScreen2 />;
  }

  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        width={"100%"}
        maxWidth={"550px"}
        margin={2}
        border={"2px solid green"}
        padding={2}
        borderRadius={3}
      >
        <Typography variant="h4" color={"orange"}>
          Enter Your Withdrawal Code
        </Typography>

        <Typography>
          Please enter your withdrawal code to complete the withdrawal process,
          please contact admin if you dont have a withdrawal code
        </Typography>

        <TextField
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          margin="dense"
          id="name"
          name="code"
          label="Enter Withdrawal Code"
          type="text"
          fullWidth
          variant="outlined"
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "" }}
          onClick={() => handleSubmit()}
        >
          Confirm Withdrawal
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmWithdrawal;
