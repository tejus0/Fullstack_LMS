import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import firebase from "../../component/firebase_config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const auth = getAuth(firebase);

const Registration = () => {
  const [employee_id, setEId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setPhone] = useState("");
  const [password, setPass] = useState("");
  const [confirmpassword, setcomfirmPass] = useState("");
  const [verifyButton, setverifyButton] = useState(false);
  const [verifyOtp, setverifyOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Inputs Errors
  const [employeeIdError, setEmployeeIdError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setconfirmpasswordError] = useState(false);
  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();
  
  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (!password || password.length < 5 || password.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleConfirmPassword = () => {
    if (!confirmpassword || confirmpassword.length < 5 || confirmpassword.length > 20) {
      setconfirmpasswordError(true);
      return;
    }
    setconfirmpasswordError(false);
  };

  const navigate = useNavigate();

  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      }
    );
  };

  const onSignInSubmit = () => {
    onCaptchaVerify();
    const phoneNumber = "+91" + mobile;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("OTP Sent Successfully !");
        setverifyOtp(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyCode = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Verification Done !");
        setOtpVerified(true);
        setverifyOtp(false);
      })
      .catch((error) => {
        alert("Invalid OTP !");
      });
  };

  const changeMobile = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length === 10) {
      setverifyButton(true);
    } else {
      setverifyButton(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    // Validation Checks
    if (!employee_id) {
      setEmployeeIdError(true);
      setFormValid("Employee ID is required.");
      return;
    }
    setEmployeeIdError(false);

    if (!username) {
      setUsernameError(true);
      setFormValid("Username is required.");
      return;
    }
    setUsernameError(false);

    if (!email || emailError) {
      setFormValid("Email is invalid.");
      return;
    }

    if (!mobile || mobile.length !== 10) {
      setMobileError(true);
      setFormValid("Mobile number is invalid.");
      return;
    }
    setMobileError(false);

    if (!password || passwordError) {
      setFormValid("Password must be atleast 5 character long");
      return;
    }

    if (!confirmpassword || confirmpasswordError || confirmpassword !== password) {
      setconfirmpasswordError(true);
      setFormValid("Password and Confirm Password do not match.");
      return;
    }
    setconfirmpasswordError(false);

    if (!otpVerified) {
      alert("Please verify your mobile number.");
      return;
    }

    setFormValid(null);
    setSuccess("Form Submitted Successfully");

    await axios
      .post(`http://localhost:4000/api/v1/register`, {
        employee_id,
        username,
        email,
        mobile,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.error === "User Exists !") {
            alert("User already exists.");
          } else {
            alert("Registration successful!");
            navigate("/login");
          }
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Box
      container
      sx={{
        p: 15,
        m: "auto",
        marginTop: "3em",
        alignItems: "center",
        bgcolor: "grey",
        width: "40%",
        borderRadius: 5,
      }}
    >
      <h1>User Registration Form</h1>

      <form action="" method="post" encType="multipart/form-data">
        <div id="recaptcha-container"></div>
        <div style={{ marginTop: "5px" }}>
          <TextField
            type="text"
            name="eId"
            label="Employee ID"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={employee_id}
            onChange={(e) => setEId(e.target.value)}
            error={employeeIdError}
            size="small"
          />
        </div>
        
        <div style={{ marginTop: "5px" }}>
          <TextField
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Enter username"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            error={usernameError}
            size="small"
          />
        </div>

        <div style={{ marginTop: "5px" }}>
          <TextField
            name="email"
            label="Email Address"
            fullWidth
            error={emailError}
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            value={email}
            onBlur={handleEmail}
            onChange={(event) => setEmail(event.target.value)}
            size="small"
          />
        </div>

        <div style={{ marginTop: "5px" }}>
          <TextField
            type="text"
            name="mno"
            value={mobile}
            onChange={(e) => changeMobile(e)}
            label="Enter mobile number"
            fullWidth
            id="standard-basic"
            variant="standard"
            sx={{ width: "100%" }}
            error={mobileError}
            size="small"
          />
          {verifyButton && (
            <Button
              onClick={onSignInSubmit}
              type="button"
              variant="contained"
              fullWidth
              startIcon={<Login />}
            >
              {otpVerified ? "Verified" : "Verify"}
            </Button>
          )}
        </div>

        {verifyOtp && (
          <div style={{ marginTop: "5px" }}>
            <TextField
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              label="Enter OTP"
              fullWidth
              id="standard-basic"
              variant="standard"
              sx={{ width: "100%" }}
              size="small"
            />
            <Button
              onClick={verifyCode}
              type="button"
              variant="contained"
              fullWidth
              startIcon={<Login />}
            >
              Verify OTP
            </Button>
          </div>
        )}

        <div style={{ marginTop: "5px" }}>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={passwordError}
              htmlFor="standard-adornment-password"
            >
              Password
            </InputLabel>
            <Input
              error={passwordError}
              value={password}
              name="password"
              onBlur={handlePassword}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(event) => setPass(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel
              error={confirmpasswordError}
              htmlFor="standard-adornment-password"
            >
              Confirm Password
            </InputLabel>
            <Input
              error={confirmpasswordError}
              value={confirmpassword}
              name="password"
              onBlur={handleConfirmPassword}
              id="standard-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              onChange={(event) => setcomfirmPass(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        {formValid && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {formValid}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}

        <div style={{ marginTop: "10px" }}>
          <Button
            onClick={handleSubmit}
            type="button"
            variant="contained"
            fullWidth
            startIcon={<Login />}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Registration;
