import React, { useState } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Typography,
  Stack,
  Chip,
  Avatar,
  Card,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MySkeleton from "./MySkeleton";
import TrailerMovieList from "./TrailerMovieList";
import BasicModal from "./BasicModal";
import useSession from "../hooks/useSession";
import useAccount from "../hooks/useAccount";
import useFavoriteStatusOfMovie from "../hooks/useFavoriteStatusOfMovie";

function MovieDetailCard({ movieDetailData, loadingDetail }) {
  // try to get sessionId and accountId from the database website
  let { sessionId } = useSession();
  let { accountId } = useAccount();
  let movieId = movieDetailData?.id || "";

  const [favorite, setFavorite] = useFavoriteStatusOfMovie({ movieId });
  const [markResult, setMarkResult] = useState("");

  // post api to mark a movie is favorite or not
  const setMovieAsFavorite = async (markedFavorite) => {
    if (!movieId || !sessionId || !accountId) {
      setMarkResult("Error happened. Sorry, try again later.");
      return;
    }

    try {
      const responseSetFavorite = await apiService.post(
        `/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          media_type: "movie",
          media_id: movieId,
          favorite: markedFavorite,
        }
      );

      const responseSetFavoriteData = responseSetFavorite?.data;

      if (responseSetFavoriteData?.success === true) {
        setMarkResult("Update Successfully.");
      } else {
        setMarkResult("Update Failed.");
      }
    } catch (error) {
      console.log(`Error message: ${error}`);
      setMarkResult("Error Happened. Sorry, try again later.");
    }
  };

  // handle set favorite
  const handleMarkFavorite = async (_, markedFavorite) => {
    await setMovieAsFavorite(markedFavorite);
    setFavorite(markedFavorite);
  };

  const IOSSwitch = styled((props) => (
    <Tooltip title="Mark this movie as your favorite">
      <Switch
        checked={favorite}
        onChange={handleMarkFavorite}
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
      />
    </Tooltip>
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#f50057" : "#f50057",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#f50057",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const chipStyles = {
    backgroundColor: "red",
    color: "white",
    fontSize: "10px",
    ml: 1,
    mt: 1,
    mb: 1,
  };

  const trailerMovieList = movieDetailData?.videos?.results;

  return (
    <>
      {loadingDetail ? (
        <MySkeleton />
      ) : movieDetailData ? (
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
                    color: "#797979",
                  }}
                >
                  {movieDetailData?.original_title}
                </Typography>

                <Stack direction="row" alignItems="center">
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 2 }} />}
                    label={"Mark this as your favorite."}
                  />

                  {markResult && <BasicModal textContent={markResult} />}
                </Stack>

                <TrailerMovieList trailerMovieList={trailerMovieList} />

                <Typography variant="body1" paragraph>
                  {movieDetailData?.overview}
                </Typography>

                {movieDetailData?.genres?.length ? (
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
                ) : (
                  ""
                )}

                {movieDetailData?.production_companies?.length ? (
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
                          background: "#f50057",
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
                ) : (
                  ""
                )}

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
