import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosPublic from "../../api/axiosPublic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setTokens } from "../../features/auth/authSlice";
import { setRefreshToken } from "../../api/refreshToken";
import { fetchUser } from "../../features/auth/authAPI";
import { useState } from "react";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { setLoading } from "../../features/core/coreSlice";

interface LocationState {
  state:
    | {
        from: {
          pathname: string;
        };
      }
    | any;
}
interface AlertState {
  title: string | undefined;
  message: string | undefined;
  severity: AlertColor;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const Axios = axiosPublic;
  const { axios } = useAxiosPrivate();
  const navigate = useNavigate();
  const location: LocationState = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<AlertState | undefined>(undefined);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAlert(undefined);
    const data = new FormData(event.currentTarget);
    dispatch(setLoading(true));
    Axios.post("/auth/jwt/create/", {
      username: data.get("username"),
      password: data.get("password"),
    })
      .then((res: AxiosResponse) => {
        dispatch(setTokens({ accessToken: res.data.access }));
        setRefreshToken(res.data.refresh);
        dispatch(fetchUser(axios)).unwrap();
        dispatch(setLoading(false));
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.response?.data.detail);
        dispatch(setLoading(false));
        if (err.response?.status === 401) {
          setAlert({
            title: err.response?.data?.detail,
            severity: "error",
            message:
              "Check email if you haven't activated account or resend the activation link.",
          });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {alert && (
              <Alert severity={alert.severity}>
                <AlertTitle>{alert.title}</AlertTitle>
                {alert.message}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="/reset_password"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/reset_password");
                  }}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
