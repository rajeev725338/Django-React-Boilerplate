import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setLoading } from "../../features/core/coreSlice";

type AlertMessageState =
  | string
  | {
      username: undefined | string[];
      email: undefined | string[];
      password: undefined | string[];
      non_field_errors: undefined | string[];
    };

interface AlertState {
  title: string | undefined;
  message: AlertMessageState | undefined;
  severity: AlertColor | undefined;
}
function Copyright(props: any) {
  const navigate = useNavigate();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const RenderList = ({ list }: { list: string[] }) => {
  return (
    <>
      {list.map((item) => {
        return <>{item}</>;
      })}
    </>
  );
};

const theme = createTheme();

const Register = () => {
  const [alert, setAlert] = useState<AlertState | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(setLoading(true));
    axios
      .post("/auth/users/", {
        first_name: data.get("first_name"),
        last_name: data.get("last_name"),
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password"),
        re_password: data.get("re_password"),
      })
      .then((res) => {
        console.log(res.data);
        setAlert(undefined);
        dispatch(setLoading(false));
        if (res.status === 201) {
          setAlert({
            title: "Registered Successfully.",
            message: "",
            severity: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch(setLoading(false));
        const message = err.response?.data
          ? (err.response.data as AlertMessageState)
          : undefined;
        if (err.response?.status === 400) {
          setAlert({
            title: "Something went wrong",
            message: message,
            severity: "error",
          });
        } else if (err.response?.status === 401) {
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item width={"100%"}>
                {alert !== undefined && (
                  <Alert severity={alert.severity}>
                    {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
                    {alert.message !== undefined &&
                      typeof alert.message === "string" && (
                        <>
                          {/* {alert.message} */}
                          Please verify your account using link sent to your
                          email.
                          <br />
                          Email not received?
                          <Link
                            href="/resend_verify_mail_link"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/login");
                            }}
                          >
                            Click here
                          </Link>{" "}
                          to resend.
                        </>
                      )}
                    {alert.message !== undefined &&
                      typeof alert.message !== "string" && (
                        <ul>
                          {alert.message.username?.map((item) => {
                            return <li>{item}</li>;
                          })}
                          {alert.message.email?.map((item) => {
                            return <li>{item}</li>;
                          })}
                          {alert.message.password?.map((item) => {
                            return <li>{item}</li>;
                          })}
                          {alert.message.non_field_errors?.map((item) => {
                            return <li>{item}</li>;
                          })}
                        </ul>
                      )}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="re_password"
                  label="Confirm Password"
                  type="re_password"
                  id="re_password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  variant="body2"
                >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
