import React from "react";
import { useSearchParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ placeholder }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  // handle submit search
  const handleSubmitSearch = (event) => {
    event.preventDefault();
    let keyword = new FormData(event.target).get("keyword");
    setSearchParams({ keyword: keyword });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmitSearch}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        maxWidth: "100vw",
        mt: "0px",
        border: "1px solid white",
        borderRadius: "0px",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search movies" }}
        name="keyword"
        defaultvalues={keyword ?? undefined}
      />
    </Paper>
  );
}
