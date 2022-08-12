import { Grid, Typography, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setLoading } from "../../features/core/coreSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
type Props = {};

const ActivateUser = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { axios } = useAxiosPrivate();
  const { uid, token } = useParams();
  const [status, setStatus] = useState<{ error: boolean } | undefined>(
    undefined
  );
  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .post("/auth/users/activation/", {
        uid,
        token,
      })
      .then((res) => {
        dispatch(setLoading(false));
        setStatus({ error: false });
      })
      .catch((error) => {
        dispatch(setLoading(false));
        setStatus({ error: true });
      });
  }, []);

  return (
    <>
      <Grid
        container
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        {status?.error && (
          <Grid item>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h3"
              component="h3"
            >
              Link Expired
            </Typography>
            <Typography
              variant="body1"
              component="p"
              maxWidth="70%"
              margin="auto"
            >
              You have either entered a wrong link or your account has already
              been activated. Try{" "}
              <Link
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                signing in
              </Link>{" "}
              with your credentials or{" "}
              <Link
                href="/resend_verify_mail_link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/resend_verify_mail_link");
                }}
              >
                resend
              </Link>{" "}
              activation link.
            </Typography>
          </Grid>
        )}
        {status?.error === false && (
          <Grid item>
            <Typography
              variant="h3"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              Verified Successfully
            </Typography>
            <Typography
              variant="body1"
              component="p"
              maxWidth="70%"
              margin="auto"
            >
              Your account has been verified successfully, Try{" "}
              <Link
                href="/login"
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                signing in
              </Link>{" "}
              with your credentials.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ActivateUser;
