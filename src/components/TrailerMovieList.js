import React from "react";
import { Box, Typography, Grid } from "@mui/material";

function TrailerMovieList({ trailerMovieList }) {
  return (
    <Grid container>
      {trailerMovieList?.length
        ? trailerMovieList
            .filter((trailer) => trailer.type === "Trailer")
            .slice(0, 2)
            .map((trailer) => (
              <>
                <Grid key={trailer.id} sx={{ m: 1 }}>
                  <Typography variant="subtitle1">{trailer?.name}</Typography>
                  <Box key={trailer.id}>
                    <iframe
                      width="300"
                      height="300"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title="Embedded youtube"
                    />
                  </Box>
                </Grid>
              </>
            ))
        : "No Trailer Movie Data Found."}
    </Grid>
  );
}

export default TrailerMovieList;
