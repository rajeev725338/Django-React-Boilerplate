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
  Paper,
  Alert,
  AlertTitle,
  AlertColor,
} from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
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
      .post("/auth/users/resend_activation/", {
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
          message: "No account exists or verified already",
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
            Resend Activation Link
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
              Activation Link expired or not received ? Please enter your email
              address. You will receive a link to activate your account via
              email.
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
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
