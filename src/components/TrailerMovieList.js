import React from "react";
import { Box, Stack, Typography, Grid } from "@mui/material";

function TrailerMovieList({ trailerMovieList }) {
  return (
    <Grid container>
      {trailerMovieList?.length
        ? trailerMovieList
            .filter((trailer) => trailer.type === "Trailer")
            .slice(0, 2)
            .map((trailer) => (
              <>
                <Stack sx={{ m: 1 }}>
                  <Typography variant="subtitle1">{trailer?.name}</Typography>
                  <Box>
                    <iframe
                      width="300"
                      height="300"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title="Embedded youtube"
                    />
                  </Box>
                </Stack>
              </>
            ))
        : ""}
    </Grid>
  );
}

export default TrailerMovieList;
