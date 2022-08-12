import { Grid } from "@mui/material";
import React from "react";

type Props = {};

const PageNotFound404 = (props: Props) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Grid>
        <h1>404!</h1>
      </Grid>
      <Grid item>
        <h3>THIS PAGE ISN'T HERE.</h3>
        <h3>PLEASE DON'T STARE.</h3>
      </Grid>
    </Grid>
  );
};

export default PageNotFound404;
