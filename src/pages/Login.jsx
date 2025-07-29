import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  country: z.string().min(1, "Select country"),
  phone: z
    .string()
    .min(6, "Enter valid number")
    .regex(/^[0-9]+$/, "Only digits allowed"),
  otp: z.string().optional(),
});

const Login = () => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const selectedCountry = watch("country");

useEffect(() => {
  fetch("https://restcountries.com/v3.1/all?fields=name,idd")
    .then((res) => res.json())
    .then((data) => {
      const formatted = data
        .map((c) => ({
          name: c.name.common,
          code: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
        }))
        .filter((c) => c.code);
      setCountries(formatted.sort((a, b) => a.name.localeCompare(b.name)));
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching countries", err);
    });
}, []);


  const onSendOtp = (data) => {
    setOtpSent(true);
    setTimeout(() => {
      alert("OTP sent! (use 1234 for testing)");
    }, 1000);
  };

  const onVerifyOtp = (data) => {
    if (data.otp === "1234") {
      dispatch(setUser({ phone: `${selectedCountry} ${data.phone}` }));
      navigate("/dashboard"); 
    } else {
      alert("Invalid OTP");
    }
  };

  if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Login via OTP
      </Typography>

      <form onSubmit={handleSubmit(otpSent ? onVerifyOtp : onSendOtp)}>
        <TextField
          fullWidth
          select
          label="Country Code"
          {...register("country")}
          error={!!errors.country}
          helperText={errors.country?.message}
          margin="normal"
        >
          {countries.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.name} ({c.code})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Phone Number"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          margin="normal"
        />

        {otpSent && (
          <TextField
            fullWidth
            label="Enter OTP"
            {...register("otp", { required: true })}
            margin="normal"
          />
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          {otpSent ? "Verify OTP" : "Send OTP"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
