import { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import useSession from "./useSession";
import useAccount from "./useAccount";

function useFavoriteStatusOfMovie({ movieId }) {
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  // try to get sessionId and accountId from the database website
  let { sessionId } = useSession();
  let { accountId } = useAccount();

  useEffect(() => {
    const fetchDataAccountStates = async () => {
      try {
        const response = await apiService.get(
          `/movie/${movieId}/account_states?api_key=${API_KEY}&session_id=${sessionId}`
        );

        const responseData = response?.data;

        if (responseData) {
          setFavoriteStatus(responseData?.favorite);
        } else {
          console.log("No Account States Data Found.");
        }
      } catch (error) {
        console.log(`Error message: ${error}`);
      }
    };

    fetchDataAccountStates();
  }, [sessionId, accountId, movieId]);

  return [favoriteStatus, setFavoriteStatus];
}

export default useFavoriteStatusOfMovie;
