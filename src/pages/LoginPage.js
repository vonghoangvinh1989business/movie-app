import React from "react";
import Stack from "@mui/material/Stack";
import LoginDialog from "../components/LoginDialog";

function LoginPage() {
  return (
    <Stack sx={{ p: 4, alignItems: "center" }}>
      <LoginDialog />
    </Stack>
  );
}

export default LoginPage;
