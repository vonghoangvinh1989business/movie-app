import React from "react";
import useFavorite from "../hooks/useFavorite";
import MovieCard from "../components/MovieCard";
import ResultMovieList from "../components/ResultMovieList";

import LoadingScreen from "../components/LoadingScreen";
import {
  Typography,
  Divider,
  Stack,
  Grid,
  Alert,
  Container,
} from "@mui/material";

function FavoritePage() {
  const [favoriteList, errorMessage, loadingFavorite] = useFavorite();

  return (
    <>
      {loadingFavorite ? (
        <LoadingScreen />
      ) : errorMessage ? (
        <Alert sx={{ m: 2 }} severity="error">
          {errorMessage}
        </Alert>
      ) : (
        <>
          <Container>
            <Grid>
              <ResultMovieList />
            </Grid>
            <Divider />
            <Stack
              m={2}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography sx={{ color: "#f50057" }} variant="h5">
                FAVORITE MOVIES
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
              {favoriteList?.length ? (
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
                    {favoriteList.map((movie) => (
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
                "No Favorite List Movie Data Found."
              )}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}

export default FavoritePage;
