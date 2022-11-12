import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

function MainLayout() {
  return (
    <Grid
      sx={{
        minHeight: "100vh",
      }}
    >
      <MainHeader />
      <Outlet />
      <MainFooter />
    </Grid>
  );
}

export default MainLayout;
