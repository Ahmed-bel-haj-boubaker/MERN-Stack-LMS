"use client";
import ProfileBanner from "@/app/components/user/ProfileBanner";
import useUserConnected from "../../hooks/user/useUserConnected";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { userName, coursesNumber, userRole, isLogged } = useUserConnected();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Only check once isLogged has a value (true or false)
    if (isLogged === false) {
      router.push("/login");
    } else if (isLogged === true) {
      setIsCheckingAuth(false);
    }
  }, [isLogged, router]);

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div>
      <ProfileBanner
        numCourses={coursesNumber}
        username={userName}
        role={userRole}
      />
    </div>
  );
};

export default Profile;
