"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Api from "@/app/Api's";
import { useRouter } from "next/navigation";

const useUserConnected = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [coursesNumber, setCourseNumber] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(Api.getUserInfo, {
          withCredentials: true,
        });
        console.log(response);
        if (response.data && response.data.user) {
          setUserName(response.data.user.username);
          setUserEmail(response.data.user.email);
          setUserAvatar(response.data.user.avatar);
          setUserRole(response.data.user.role);
          setCourseNumber(response.data.user.courses.length);
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
      sessionStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return {
    isLogged,
    userName,
    handleLogout,
    userEmail,
    coursesNumber,
    userAvatar,
    userRole,
  };
};

export default useUserConnected;
