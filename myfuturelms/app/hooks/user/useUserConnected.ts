"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import Api from "@/app/Api's";
import { useRouter } from "next/navigation";

const useUserConnected = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [id, setId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [coursesNumber, setCourseNumber] = useState<number>(0);
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [registerDate, setRegisterDate] = useState<string>("");

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
          setAccessToken(response.data.user.accessToken);
          setId(response.data.user._id);
          setUserEmail(response.data.user.email);
          setUserAvatar(response.data.user.avatar);
          setUserRole(response.data.user.role);
          setCourseNumber(response.data.user.courses.length);
          setFacebook(response.data.user.facebookLink);
          setBiography(response.data.user.biography);
          setLastName(response.data.user.lastName);
          setFirstName(response.data.user.firstName);
          setSkills(response.data.user.skills);
          setPhoneNumber(response.data.user.phoneNumber);
          setInstagram(response.data.user.instagram);
          setLinkedIn(response.data.user.linkedInLink);
          setJob(response.data.user.job);
          setRegisterDate(response.data.user.createdAt);
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
    accessToken,
    id,
    userName,
    handleLogout,
    userEmail,
    coursesNumber,
    userAvatar,
    userRole,
    lastName,
    facebook,
    instagram,
    biography,
    linkedIn,
    phoneNumber,
    firstName,
    job,
    skills,
    registerDate,
  };
};

export default useUserConnected;
