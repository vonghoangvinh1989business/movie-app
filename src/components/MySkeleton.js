import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function MySkeleton() {
  return (
    <Stack spacing={2} width="300px" height="500px">
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
    </Stack>
  );
}

export default MySkeleton;
