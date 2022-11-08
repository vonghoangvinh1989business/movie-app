import React from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  Chip,
  Avatar,
  Card,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";

function MovieDetailCard({ movieDetailData, loadingDetail }) {
  const chipStyles = {
    backgroundColor: "red",
    color: "white",
    fontSize: "10px",
    ml: 1,
    mt: 1,
    mb: 1,
  };

  return (
    <>
      {movieDetailData ? (
        <Card sx={{ background: "transparent", borderRadius: "0 !important" }}>
          <Grid
            container
            justifyContent={{
              xs: "center",
              sm: "center",
              md: "center",
              lg: "center",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "center",
              }}
              item
              xs={12}
              sm={5}
              md={4}
              lg={4}
              p={4}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  alt={`${
                    movieDetailData?.original_title ||
                    movieDetailData?.original_name
                  }`}
                  src={`https://image.tmdb.org/t/p/w500/${movieDetailData?.poster_path}`}
                  height="500px"
                />
              </Box>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              item
              xs={12}
              sm={7}
              md={8}
              lg={8}
              p={4}
            >
              <Box sx={{ marginLeft: "0.5rem" }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  {movieDetailData?.original_title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {movieDetailData?.overview}
                </Typography>

                <Grid container>
                  <Typography
                    sx={{ mt: 1 }}
                    gutterBottom
                    variant="body2"
                    component="div"
                  >
                    Genres:
                  </Typography>
                  {movieDetailData?.genres.map((genre) => (
                    <Chip
                      sx={chipStyles}
                      key={`${genre?.id}`}
                      size="small"
                      label={genre?.name}
                    />
                  ))}
                </Grid>

                <Grid container>
                  <Typography
                    sx={{ mt: 1 }}
                    gutterBottom
                    variant="body2"
                    component="div"
                  >
                    Productions Companies:
                  </Typography>
                  {movieDetailData?.production_companies.map((company) => (
                    <Chip
                      sx={{
                        color: "white",
                        fontSize: "10px",
                        ml: 1,
                        mt: 1,
                        mb: 1,
                        backgroundColor: "#ab003c",
                      }}
                      key={`${company?.id}`}
                      size="small"
                      label={company?.name}
                      avatar={
                        <Avatar
                          alt={company?.name}
                          src={`https://image.tmdb.org/t/p/w500/${company?.logo_path}`}
                          variant="outlined"
                        />
                      }
                    />
                  ))}
                </Grid>

                <Grid container>
                  <Typography
                    sx={{ mt: 1 }}
                    gutterBottom
                    variant="body2"
                    component="div"
                  >
                    Release Date:
                  </Typography>
                  <Chip
                    sx={{
                      color: "white",
                      fontSize: "10px",
                      ml: 1,
                      mt: 1,
                      mb: 1,
                      backgroundColor: "#357a38",
                    }}
                    size="small"
                    label={`${movieDetailData?.release_date}`}
                  />
                </Grid>

                <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    mr={3}
                  >
                    <RecommendIcon sx={{ color: "green" }} fontSize="small" />
                    <Typography variant="subtitle2" ml={1}>
                      {`${movieDetailData?.vote_average}`}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <FavoriteIcon sx={{ color: "#f50057" }} fontSize="small" />
                    <Typography variant="subtitle2" ml={1}>
                      {`${movieDetailData?.vote_count}`}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Card>
      ) : (
        "No Movie Detail Data Found."
      )}
    </>
  );
}

export default MovieDetailCard;
