import Api from "@/app/Api's";
import apiClient from "@/app/Api/ApiClient";
import { IUser } from "@/app/types/UserTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useUserConnected = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const router = useRouter();
  const fetchUser = async () => {
    try {
      const response = await apiClient.get<{ user: IUser }>("/me");
      console.log(response);
      if (response.data && response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const handleLogout = async () => {
    try {
      await apiClient.get("/logout-user");
      setIsLogged(false);
      sessionStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return {
    user,
    isLogged,
    handleLogout,
  };
};
export default useUserConnected;
