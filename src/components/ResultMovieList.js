import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Grid, Alert, Divider } from "@mui/material";
import MovieCard from "./MovieCard";
import LoadingScreen from "../components/LoadingScreen";

function ResultMovieList() {
  const [resultList, setResultList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  let [search] = useSearchParams();
  const keyword = search.get("keyword");

  useEffect(() => {
    // set loading
    setLoading(true);

    // call api to fetch data when we have keyword to search movie
    const fetchSearchMoviesData = async () => {
      try {
        const url = `/search/movie?api_key=${API_KEY}&query=${keyword}&language=en-US&page=1`;
        const response = await apiService.get(url);
        const moviesDataResult = response.data.results;

        if (moviesDataResult?.length >= 0) {
          setResultList(moviesDataResult);
          setResultMessage("");
        } else {
          setResultMessage("No Result Found.");
        }
      } catch (error) {
        console.log(`Error message: ${error}`);
        setResultMessage("No Result Found.");
      }

      setLoading(false);
    };

    fetchSearchMoviesData();
  }, [keyword]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : resultMessage && keyword ? (
        <>
          <Alert sx={{ m: 2 }} severity="error">
            {resultMessage}
          </Alert>
          <Divider />
        </>
      ) : (
        keyword && (
          <>
            <Grid
              backgroundColor="#4C0070"
              container
              justifyContent={{
                xs: "center",
                sm: "center",
                md: "center",
                lg: "center",
              }}
              mt={0}
              p={2}
            >
              {resultList.length
                ? resultList.map((movie) => (
                    <Grid
                      display="flex"
                      justifyContent="center"
                      mt={1}
                      mb={1}
                      key={movie.id}
                      item
                      xs={8}
                      sm={4}
                      md={3}
                      lg={3}
                    >
                      <MovieCard key={movie.id} movie={movie} />
                    </Grid>
                  ))
                : "No Result Found."}
            </Grid>
            <Divider />
          </>
        )
      )}
    </>
  );
}

export default ResultMovieList;
