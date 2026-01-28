import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmWithdrawal = () => {
  const { user } = useSelector((state) => state.auth);
  const [code, setCode] = useState();
  const navigate = useNavigate();

  const handleSubmit = () => {
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

      toast.success("Withdrawal Request Successfull");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      toast.error("Wrong Withdrawal Code");
    }
  };

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
