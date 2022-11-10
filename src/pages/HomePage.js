import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Grid, Alert } from "@mui/material";
import TrendingMoviesList from "../components/TrendingMoviesList";
import GenresMoviesList from "../components/GenresMoviesList";
import LoadingScreen from "../components/LoadingScreen";

function HomePage() {
  const [trendingList, setTrendingList] = useState([]);
  const [loadingTrend, setLoadingTrend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // set loading
    setLoadingTrend(true);

    // call api to fetch data of movies
    const fetchMoviesData = async () => {
      try {
        const response = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );

        const trendingMoviesData = response.data.results;

        if (trendingMoviesData.length >= 0) {
          setTrendingList(trendingMoviesData);
          setErrorMessage("");
        } else {
          setErrorMessage("No Trending Movies Data Found");
        }
      } catch (error) {
        console.log(`Error message is: ${error}`);
        setErrorMessage("No Trending Movies Data Found");
      }

      setLoadingTrend(false);
    };

    fetchMoviesData();
  }, []);

  return (
    <>
      {loadingTrend ? (
        <LoadingScreen />
      ) : (
        <>
          {errorMessage ? (
            <Alert sx={{ m: 2 }} severity="error">
              {errorMessage}
            </Alert>
          ) : (
            <Grid
              container
              flexDirection="column"
              justifyContent={{
                xs: "center",
                sm: "center",
                md: "center",
                lg: "center",
              }}
            >
              <Grid>
                <TrendingMoviesList trendingList={trendingList} />
              </Grid>
              <Grid>
                <GenresMoviesList />
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
