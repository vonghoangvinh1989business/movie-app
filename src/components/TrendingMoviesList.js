import React from "react";
import { Grid, Typography, Divider, Stack } from "@mui/material";
import MovieCard from "./MovieCard";

function TrendingMoviesList({ trendingList }) {
  return (
    <>
      <Stack m={2}>
        <Typography variant="h5">TRENDING</Typography>
      </Stack>
      <Divider />
      <Grid
        container
        justifyContent={{
          xs: "center",
          sm: "center",
          md: "center",
          lg: "center",
        }}
        spacing={2}
      >
        {trendingList
          ? trendingList.map((movie) => (
              <Grid
                display="flex"
                justifyContent="center"
                mt={1}
                mb={1}
                key={movie.id}
                item
                xs={8}
                sm={6}
                md={4}
                lg={3}
              >
                <MovieCard movie={movie} />
              </Grid>
            ))
          : "No Trending Movie Data Found"}
      </Grid>
    </>
  );
}

export default TrendingMoviesList;
