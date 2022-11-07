import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <Card className="card" sx={{ maxWidth: "250px" }}>
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.original_title || movie.original_name}
          sx={{ padding: "1em 1em 0 1em", objectFit: "cover" }}
        />
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Typography gutterBottom variant="body1" component="div">
              {movie.original_title || movie.original_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.release_date || movie.first_air_date}
            </Typography>

            <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mr={3}
              >
                <RecommendIcon sx={{ color: "green" }} fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${movie.vote_average}`}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <FavoriteIcon sx={{ color: "#f50057" }} fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${movie.vote_count}`}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
