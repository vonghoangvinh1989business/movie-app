import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider, Stack, Pagination } from "@mui/material";
import MovieCard from "./MovieCard";

const MOVIE_PER_PAGE = 4;

function TrendingMoviesList({ trendingList }) {
  const totalPage = Math.ceil(trendingList.length / MOVIE_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    const begin = (currentPage - 1) * MOVIE_PER_PAGE;
    const end = begin + MOVIE_PER_PAGE;
    setCurrentData((_) => trendingList.slice(begin, end));
  }, [currentPage, trendingList]);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Stack
        m={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">TRENDING</Typography>
        <Pagination
          page={currentPage}
          count={totalPage}
          onChange={handlePageChange}
        />
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
        {currentData.length
          ? currentData.map((movie) => (
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
                <MovieCard key={movie.id} movie={movie} />
              </Grid>
            ))
          : "No Trending Movie Data Found"}
      </Grid>
    </>
  );
}

export default TrendingMoviesList;
