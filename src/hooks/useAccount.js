import { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import useSession from "./useSession";

function useAccount() {
  const { sessionId } = useSession();
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    const getAccountIdFromApiOrLocalStorage = async () => {
      try {
        const value = window.sessionStorage.getItem("account_id");

        if (value) {
          try {
            setAccountId(JSON.parse(value));
          } catch (error) {
            window.sessionStorage.removeItem("account_id");
          }
        } else {
          // get request token first
          const responseAccountInfo = await apiService.get(
            `/account?api_key=${API_KEY}&session_id=${sessionId}`
          );

          const responseAccountData = responseAccountInfo?.data;
          const response_account_id = responseAccountData?.id;

          if (response_account_id) {
            setAccountId(response_account_id);
            window.sessionStorage.setItem(
              "account_id",
              JSON.stringify(response_account_id)
            );
          }
        }
      } catch (error) {
        console.log(`Error message: ${error}`);
      }
    };

    getAccountIdFromApiOrLocalStorage();
  }, [accountId, sessionId]);

  return { accountId };
}

export default useAccount;
