import { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

// custom hook
function useSession() {
  // call api to get session id
  const getSessionId = async () => {
    try {
      let sessionId = "";

      // get request token first
      const responseRequestToken = await apiService.get(
        `/authentication/token/new?api_key=${API_KEY}`
      );

      let requestToken = "";

      if (
        responseRequestToken?.data?.success === true &&
        responseRequestToken?.data?.request_token
      ) {
        requestToken = responseRequestToken?.data?.request_token;
      }

      if (requestToken) {
        // const jsonPayLoad = JSON.stringify({ request_token: requestToken });
        const responseAuthentication = await apiService.post(
          `/authentication/token/validate_with_login?api_key=${API_KEY}`,
          {
            username: "vonghoangvinh1989",
            password: "23011989",
            request_token: requestToken,
          }
        );

        if (
          responseAuthentication?.data?.success === true &&
          responseAuthentication?.data?.request_token
        ) {
          const responseSession = await apiService.post(
            `/authentication/session/new?api_key=${API_KEY}`,
            {
              request_token: requestToken,
            }
          );

          if (
            responseSession?.data?.success === true &&
            responseSession?.data?.session_id
          ) {
            sessionId = responseSession?.data?.session_id;
          }
        }

        return sessionId;
      } else {
        return "";
      }
    } catch (error) {
      console.log(`Error message: ${error}`);
      return "";
    }
  };

  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const getSessionIdOrGenerate = async () => {
      const value = window.sessionStorage.getItem("session_id");

      if (value) {
        try {
          setSessionId(JSON.parse(value));
        } catch (error) {
          window.sessionStorage.removeItem("session_id");
        }
      } else {
        let resultSession = await getSessionId();
        if (resultSession) {
          setSessionId(resultSession);
          window.sessionStorage.setItem(
            "session_id",
            JSON.stringify(resultSession)
          );
        }
      }
    };

    getSessionIdOrGenerate();
  }, [sessionId]);

  return { sessionId };
}

export default useSession;
