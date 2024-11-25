"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Api from "@/app/Api's";  
 
const useUserConnected = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(Api.getUserInfo, {
          withCredentials: true,
        });
        if (response.data && response.data.user) {
          setUserName(response.data.user.username);
          setIsLogged(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setIsLogged(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(Api.logout, { withCredentials: true });
      setIsLogged(false);
      setUserName("");
      sessionStorage.removeItem("user"); // Optional: Remove user data from session storage
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return { isLogged, userName, handleLogout };
};

export default useUserConnected;
