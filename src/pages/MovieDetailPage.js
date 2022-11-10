import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { useParams } from "react-router-dom";
import { Grid, Typography, Divider, Alert } from "@mui/material";
import MovieDetailCard from "../components/MovieDetailCard";

function MovieDetailPage() {
  // get movie id parameter from url
  let { movieId } = useParams();

  const [movieDetailData, setMovieDetailData] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // set loading detail
    setLoadingDetail(true);

    // call api to get movie detail data
    const fetchMovieDetailData = async () => {
      try {
        const response = await apiService.get(
          `/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`
        );
        const movieDetailData = response.data;

        if (movieDetailData) {
          setMovieDetailData(movieDetailData);
          setErrorMessage("");
        } else {
          setErrorMessage("No Movie Detail Data Found.");
        }
      } catch (error) {
        console.log(`Error message: ${error.message}`);
        setErrorMessage("No Movie Detail Data Found.");
      }

      setLoadingDetail(false);
    };

    fetchMovieDetailData();
  }, [movieId]);

  return (
    <Grid sx={{ m: 2 }}>
      {errorMessage ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              mb: 1,
              display: "block",
              textTransform: "uppercase",
            }}
          >
            MOVIE INFO
          </Typography>
          <Divider />
          <MovieDetailCard
            movieDetailData={movieDetailData}
            loadingDetail={loadingDetail}
          />
          <Divider />
        </>
      )}
    </Grid>
  );
}

export default MovieDetailPage;
