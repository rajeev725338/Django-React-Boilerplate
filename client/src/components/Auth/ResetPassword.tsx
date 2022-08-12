import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Alert,
  AlertTitle,
  AlertColor,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import Link from "@mui/material/Link";
import axios from "../../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setLoading } from "../../features/core/coreSlice";

type Props = {};
const theme = createTheme();

const ResetPassword = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState<
    | {
        title: string | undefined;
        message: string;
        severity: AlertColor | undefined;
      }
    | undefined
  >(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAlert(undefined);
    dispatch(setLoading(true));
    const data = new FormData(event.currentTarget);
    axios
      .post("/auth/users/reset_password/", {
        email: data.get("email"),
      })
      .then((res: AxiosResponse) => {
        dispatch(setLoading(false));
        console.log(res.status);
        if (res.status === 204) {
          setAlert({
            title: undefined,
            message: "Email sent successfully.",
            severity: "success",
          });
        } else {
          setAlert({
            title: undefined,
            message: res.data.message,
            severity: "warning",
          });
        }
      })
      .catch((error: AxiosError) => {
        dispatch(setLoading(false));
        setAlert({
          title: undefined,
          message: "Something went wrong.",
          severity: "error",
        });
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
          <Typography
            component="h1"
            variant="h5"
            sx={{ marginRight: "auto", marginBottom: 1 }}
          >
            Forgot Password
          </Typography>
          <Paper
            sx={{
              paddingTop: 3,
              paddingRight: 10,
              paddingBottom: 3,
              paddingLeft: 3,
              mt: 2,
            }}
          >
            {alert && (
              <Alert severity={alert.severity}>
                {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
                {alert.message}
              </Alert>
            )}
            <Typography>
              Lost your password? Please enter your username or email address.
              You will receive a link to create a new password via email.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, mb: 3 }}>
              <TextField
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                fullWidth
                type="email"
              />
              <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Reset Password
              </Button>
            </Box>
            <Divider />
            <Grid container>
              <Grid item sm sx={{ mt: 1, fontSize: 15 }}>
                <Link
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  variant="inherit"
                >
                  Remember password?
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
