import { useState, useEffect } from "react";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    setUserInfo(storedUserInfo);
  }, []);

  return userInfo;
};

export default useUserInfo;
