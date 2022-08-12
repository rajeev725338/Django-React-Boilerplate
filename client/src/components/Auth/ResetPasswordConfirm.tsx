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
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setLoading } from "../../features/core/coreSlice";

type AlertMessageState =
  | string
  | {
      token: undefined | string[];
      new_password: undefined | string[];
      non_field_errors: undefined | string[];
    };

interface AlertState {
  title: string | undefined;
  message: AlertMessageState | undefined;
  severity: AlertColor | undefined;
}
type Props = {};
const theme = createTheme();

const ResetPasswordConfirm = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, uid } = useParams();
  const [alert, setAlert] = useState<AlertState | undefined>(undefined);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setLoading(true));
    setAlert(undefined);
    const data = new FormData(event.currentTarget);
    axios
      .post("/auth/users/reset_password_confirm/", {
        new_password: data.get("password"),
        re_new_password: data.get("re_password"),
        token: token,
        uid: uid,
      })
      .then((res: AxiosResponse) => {
        dispatch(setLoading(false));
        if (res.status === 204) {
          setAlert({
            title: "Password changed successfully",
            message: "Redirecting to login page....",
            severity: "success",
          });
        }
      })
      .catch((err: AxiosError) => {
        dispatch(setLoading(false));
        console.log(err.response?.data);
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
            Reset Password
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
                {alert.message !== undefined &&
                  typeof alert.message === "string" && (
                    <>
                      {/* {alert.message} */}
                      <Link
                        href="/login"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/login");
                        }}
                      >
                        Click here
                      </Link>{" "}
                      to go login page.
                    </>
                  )}
                {alert.message !== undefined &&
                  typeof alert.message !== "string" && (
                    <ul>
                      {alert.message.new_password?.map((item) => {
                        return <li>{item}</li>;
                      })}
                      {alert.message.non_field_errors?.map((item) => {
                        return <li>{item}</li>;
                      })}
                      {alert.message.token && (
                        <li>{"Invalid or Expired Url"}</li>
                      )}
                    </ul>
                  )}
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
                id="password"
                label="Password"
                name="password"
                type="password"
                autoFocus
                fullWidth
              />
              <TextField
                margin="normal"
                required
                type="password"
                id="re_password"
                label="Confirm Password"
                name="re_password"
                autoFocus
                fullWidth
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

export default ResetPasswordConfirm;
