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
        console.log(response.data);
        if (response.data && response.data.user) {
          setUserName(response.data.user.username);
          setIsLogged(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setIsLogged(false); // Optional: Reset login state on error
      }
    };

    fetchUser();
  }, []);

  return { isLogged, userName };
};

export default useUserConnected;
