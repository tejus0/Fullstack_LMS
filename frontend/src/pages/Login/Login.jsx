import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Container,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import bg from "../../assets/signin.svg";
import bgimg from "../../assets/backimg.jpg";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

function Login() {
  const [mobileInput, setMobileInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMobile = () => {
    if (mobileInput.length !== 10) {
      setMobileError(true);
      return;
    }
    setMobileError(false);
  };

  const handlePassword = () => {
    if (!password || password.length < 5 || password.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleMobile();
    handlePassword();

    if (mobileError || !mobileInput) {
      toast.error("Mobile number must be 10 digits. Please re-enter.");
      return;
    }

    if (passwordError || !password) {
      toast.error("Password must be between 5 - 20 characters. Please re-enter.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4000/api/v1/login`, {
        mobile: mobileInput,
        password,
      });

      if (response.data.status === "ok") {
        toast.success("Login Successful", { position: "top-right" });
        window.localStorage.setItem("token", response.data.data);
        window.localStorage.setItem("loggedIn", true);
        window.localStorage.setItem("mobile", mobileInput);
        window.localStorage.setItem("user-type", response.data.type);

        if (response.data.type === "user") {
          navigate(`/fn/${response.data.data}`);
        } else {
          navigate("/admin-page");
        }
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
      }}
    >
      <Box sx={boxstyle}>
        <Grid container>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                marginTop: "40px",
                marginLeft: "15px",
                marginRight: "15px",
                height: "63vh",
                color: "#f5f5f5",
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Box
              style={{
                backgroundSize: "cover",
                height: "70vh",
                minHeight: "500px",
                backgroundColor: "#3b33d5",
              }}
            >
              <ThemeProvider theme={darkTheme}>
                <Container>
                  <Box height={35} />
                  <Box sx={center}>
                    <Avatar
                      sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                    >
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                      Sign In
                    </Typography>
                  </Box>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          label="Mobile Number"
                          fullWidth
                          error={mobileError}
                          id="standard-basic"
                          sx={{ width: "100%" }}
                          value={mobileInput}
                          onBlur={handleMobile}
                          onChange={(event) => setMobileInput(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          sx={{ width: "100%" }}
                          error={passwordError}
                          value={password}
                          label="Password"
                          name="password"
                          onBlur={handlePassword}
                          id="standard-adornment-password"
                          type={showPassword ? "text" : "password"}
                          onChange={(event) => setPassword(event.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            variant="body1"
                            component="span"
                            onClick={() => navigate("/forget-pass")}
                            style={{ marginTop: "10px", cursor: "pointer" }}
                          >
                            Forgot password?
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          sx={{
                            mt: "10px",
                            mr: "20px",
                            borderRadius: 28,
                            color: "#ffffff",
                            minWidth: "170px",
                            backgroundColor: "#FF9A01",
                          }}
                        >
                          Sign in
                        </Button>
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            variant="body1"
                            component="span"
                            style={{ marginTop: "10px" }}
                          >
                            Not registered yet?{" "}
                            <span
                              style={{ color: "#beb4fb", cursor: "pointer" }}
                              onClick={() => navigate("/register")}
                            >
                              Create an Account
                            </span>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </ThemeProvider>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
