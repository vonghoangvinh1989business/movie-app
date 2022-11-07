import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import MovieDetailPage from "../pages/MovieDetailPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
