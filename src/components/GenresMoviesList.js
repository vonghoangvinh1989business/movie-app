import React, { useState, useEffect } from "react";
import {
  Typography,
  Divider,
  Stack,
  Grid,
  Alert,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import MovieCard from "./MovieCard";
import LoadingScreen from "./LoadingScreen";

function GenresMoviesList() {
  const [loading, setLoading] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [genreId, setGenreId] = useState();
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // loading genres list
  useEffect(() => {
    // set loading
    setLoading(true);

    const fetchGenresList = async () => {
      try {
        const response = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );

        const genresData = response.data.genres;

        if (genresData.length >= 0) {
          setGenresList(genresData);
          setErrorMessage("");
        } else {
          setErrorMessage("No Genres List Data Found.");
        }
      } catch (error) {
        console.log(`Error message: ${error}`);
        setErrorMessage("No Genres List Data Found.");
      }

      setLoading(false);
    };

    fetchGenresList();
  }, []);

  // loading movies based on genres (discover)
  useEffect(() => {
    // set loading
    setLoading(true);

    const fetchMovieData = async () => {
      let url = `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&append_to_response=videos`;

      try {
        if (genreId) {
          url = `${url}&with_genres=${genreId}`;
        }

        const response = await apiService.get(`${url}`);
        const movieListData = response.data.results;

        if (movieListData.length >= 0) {
          setMovieList(movieListData);
          setErrorMessage("");
        } else {
          setErrorMessage("No Movie List Data Found.");
        }
      } catch (error) {
        console.log(`Error messsage: ${error}`);
        setErrorMessage("No Movie List Data Found.");
      }

      setLoading(false);
    };

    fetchMovieData();
  }, [genreId]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : errorMessage ? (
        <Alert sx={{ m: 2 }} severity="error">
          {errorMessage}
        </Alert>
      ) : (
        <>
          <Stack
            m={2}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography sx={{ color: "#f50057" }} variant="h5">
              MOVIE GENRES
            </Typography>
          </Stack>
          <Divider />
          <Grid
            container
            spacing={2}
            justifyContent={{
              xs: "center",
              sm: "center",
              md: "center",
              lg: "center",
            }}
            p={2}
          >
            {genresList?.length ? (
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <Stack direction="column">
                  <Typography sx={{ color: "#f50057" }} variant="body1">
                    Genres
                  </Typography>
                  {genresList.map((genre) => (
                    <ListItemButton
                      disableGutters
                      key={genre.id}
                      onClick={() => setGenreId(genre.id)}
                    >
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: 15,
                          fontWeight: "small",
                          lineHeight: "20px",
                        }}
                        primary={genre.name}
                      />
                    </ListItemButton>
                  ))}
                </Stack>
              </Grid>
            ) : (
              "No Genres List Data Found."
            )}

            {movieList?.length ? (
              <Grid item xs={11} sm={11} md={11} lg={11}>
                <Grid
                  container
                  justifyContent={{
                    xs: "center",
                    sm: "center",
                    md: "center",
                    lg: "center",
                  }}
                >
                  {movieList.map((movie) => (
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
                  ))}
                </Grid>
              </Grid>
            ) : (
              "No Movie List Data Found."
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default GenresMoviesList;
