import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Grid, Alert, Container } from "@mui/material";
import TrendingMoviesList from "../components/TrendingMoviesList";
import ResultMovieList from "../components/ResultMovieList";
import GenresMoviesList from "../components/GenresMoviesList";
import LoadingScreen from "../components/LoadingScreen";
import useSession from "../hooks/useSession";

function HomePage() {
  const [trendingList, setTrendingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: implement
  useSession();

  useEffect(() => {
    // set loading
    setLoading(true);

    // call api to fetch data of movies
    const fetchMoviesData = async () => {
      try {
        const url = `/trending/all/day?api_key=${API_KEY}`;
        const response = await apiService.get(url);
        const moviesData = response.data.results;

        if (moviesData?.length >= 0) {
          setTrendingList(moviesData);
          setErrorMessage("");
        } else {
          setErrorMessage("No Trending Movies Data Found");
        }
      } catch (error) {
        console.log(`Error message is: ${error}`);
        setErrorMessage("No Trending Movies Data Found");
      }

      setLoading(false);
    };

    fetchMoviesData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {errorMessage ? (
            <Alert sx={{ m: 2 }} severity="error">
              {errorMessage}
            </Alert>
          ) : (
            <Container>
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
                  <ResultMovieList />
                </Grid>
                <Grid>
                  <TrendingMoviesList trendingList={trendingList} />
                </Grid>
                <Grid>
                  <GenresMoviesList />
                </Grid>
              </Grid>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
