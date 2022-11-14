import { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import useSession from "./useSession";
import useAccount from "./useAccount";

function useFavorite() {
  const [errorMessage, setErrorMessage] = useState("");
  const [favoriteList, setFavoriteList] = useState([]);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  // try to get sessionId and accountId from the database website
  let { sessionId } = useSession();
  let { accountId } = useAccount();

  useEffect(() => {
    // set loading
    setLoadingFavorite(true);

    const fetchFavoriteList = async () => {
      try {
        if (!sessionId || !accountId) {
          setErrorMessage("No Favorite List Movie Data Found.");
          return;
        }

        const response = await apiService.get(
          `/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
        );

        const favoriteMovieListData = response?.data?.results;

        if (favoriteMovieListData?.length >= 0) {
          setFavoriteList(favoriteMovieListData);
          setErrorMessage("");
        } else {
          setErrorMessage("No Favorite List Movie Data Found.");
        }
      } catch (error) {
        setErrorMessage("No Favorite List Movie Data Found.");
        console.log(`Error message: ${error}`);
      }

      setLoadingFavorite(false);
    };

    fetchFavoriteList();
  }, [sessionId, accountId]);

  return { favoriteList, errorMessage, loadingFavorite };
}

export default useFavorite;
