"use client";

import ProfileBanner from "@/app/components/user/ProfileBanner";
import ProfileSideBar from "@/app/components/user/ProfileSideBar";
import useUserConnected from "../../hooks/user/useUserConnected";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileDashboard from "@/app/components/user/ProfileDashboard";
import ProfileInformation from "@/app/components/user/ProfileInformation";

const Profile = () => {
  const {
    userName,
    coursesNumber,
    userRole,
    isLogged,
    lastName,
    firstName,
    userEmail,
    phoneNumber,
    registerDate,
    biography,
    job,
  } = useUserConnected();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // State to control which component is displayed
  const [activeComponent, setActiveComponent] = useState<
    "dashboard" | "profile"
  >("profile");

  useEffect(() => {
    if (isLogged === false) {
      router.push("/login");
    } else if (isLogged === true) {
      setIsCheckingAuth(false);
    }
  }, [isLogged, router]);

  if (isCheckingAuth) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <ProfileBanner
            numCourses={coursesNumber}
            username={userName}
            role={userRole}
          />
        </div>
        <div className="flex xl:flex-row sm:flex-col rounded-xl  border shadow-lg  mb-6">
          <div className=" mt-3 ">
            <ProfileSideBar
              setActiveComponent={setActiveComponent}
              userName={userName}
            />
          </div>
          <div className="pr-2 mt-3 mb-6 ">
            <div>{activeComponent === "dashboard" && <ProfileDashboard />}</div>{" "}
            <div>
              {activeComponent === "profile" && (
                <ProfileInformation
                  biography={biography}
                  email={userEmail}
                  firstName={firstName}
                  lastName={lastName}
                  occupation={job}
                  phoneNumber={phoneNumber}
                  registrationDate={registerDate}
                  username={userName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
