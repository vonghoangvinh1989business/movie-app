import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { useParams, Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import ResultMovieList from "../components/ResultMovieList";
import {
  Grid,
  Alert,
  Pagination,
  PaginationItem,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import MovieCard from "../components/MovieCard";

function DiscoveryPage() {
  const [discoveryMovieList, setDiscoveryMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // get page id param
  const { pageId } = useParams();

  const [currentPage, setCurrentPage] = useState(pageId || 1);

  useEffect(() => {
    // set loading
    setLoading(true);

    // call api to get discovery movie list
    const fetchDiscovery = async () => {
      try {
        const response = await apiService.get(
          `/discover/movie?api_key=${API_KEY}&page=${currentPage}&language=en-US&sort_by=popularity.desc`
        );

        const discoveryMovieData = response.data.results;

        if (discoveryMovieData?.length >= 0) {
          setDiscoveryMovieList(discoveryMovieData);
          setErrorMessage("");
        } else {
          setErrorMessage("No Discovery Movie Data Found.");
        }
      } catch (error) {
        console.log(`Error message: ${error}`);
        setErrorMessage("No Discovery Movie Data Found.");
      }

      setLoading(false);
    };

    fetchDiscovery();
  }, [currentPage]);

  const handlePageChange = (_, page) => {
    setCurrentPage(page);
  };

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
            <>
              <Grid>
                <ResultMovieList />
              </Grid>
              <Divider />

              <Stack
                container
                m={2}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h5">DISCOVERY MOVIE</Typography>
                <Pagination
                  size="large"
                  count={20}
                  page={currentPage}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/discovery/${item.page}`}
                      {...item}
                    />
                  )}
                />
              </Stack>
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
                {discoveryMovieList.length
                  ? discoveryMovieList.map((movie) => (
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
                  : "No Discovery Movie Data Found."}
              </Grid>
              <Grid container m={2} justifyContent="center">
                <Pagination
                  size="large"
                  count={20}
                  page={currentPage}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/discovery/${item.page}`}
                      {...item}
                    />
                  )}
                />
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
}

export default DiscoveryPage;
