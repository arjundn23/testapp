import { useState, useEffect } from "react";
import {
  useGetUserUsingTokenQuery,
  useGetProfileQuery,
} from "../slices/usersApiSlice";
import useUserInfo from "./useUserInfo";

const useUserData = () => {
  const userInfo = useUserInfo();
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const { data, error } = useGetProfileQuery(userId, { skip: !userId });
  const { data: userData, error: userError } = useGetUserUsingTokenQuery(
    userToken,
    { skip: !userToken }
  );
  const [result, setResult] = useState(null);
  const [resultError, setResultError] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      const params = new URLSearchParams(window.location.search);
      const tokenFromURL = params.get("t");
      if (tokenFromURL) {
        setUserToken(tokenFromURL);
      }
    } else {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        const id = parsedUserInfo._id;
        if (id) {
          setUserId(id);
        } else {
          console.error("ID not found in userInfo.");
        }
      } catch (err) {
        console.error("Error parsing userInfo from local storage:", err);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (data) {
      setResult(data);
    } else if (error) {
      setResultError(error);
      console.error("Error fetching user data");
    }
  }, [data, error]);

  useEffect(() => {
    if (userData) {
      setResult(userData);
    } else if (userError) {
      setResultError(userError);
      console.error("Error fetching token user data");
    }
  }, [userData, userError]);

  return { data: result, error: resultError };
};

export default useUserData;
