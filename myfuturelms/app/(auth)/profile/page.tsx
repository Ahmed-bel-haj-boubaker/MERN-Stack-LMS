"use client";

import ProfileBanner from "@/app/components/user/ProfileBanner";
import ProfileSideBar from "@/app/components/user/ProfileSideBar";
import useUserConnected from "../../hooks/user/useUserConnected";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileDashboard from "@/app/components/user/ProfileDashboard";
import ProfileInformation from "@/app/components/user/ProfileInformation";
import EnrolledCourses from "@/app/components/user/EnrolledCourses";

const Profile = () => {
  const { user, isLogged } = useUserConnected();
  console.log(user);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [activeComponent, setActiveComponent] = useState<
    "dashboard" | "profile" | "courses"
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
            numCourses={user?.courses.length}
            username={user?.username}
            role={user?.role}
          />
        </div>
        <div className="flex xl:flex-row sm:flex-col rounded-xl  border shadow-lg  mb-6 ">
          <div className=" mt-3 ">
            <ProfileSideBar
              setActiveComponent={setActiveComponent}
              userName={user?.username}
            />
          </div>
          <div className="pr-2 mt-3 mb-6 w-full">
            <div>{activeComponent === "dashboard" && <ProfileDashboard />}</div>{" "}
            <div>
              {activeComponent === "profile" && (
                <ProfileInformation
                  biography={user?.biography}
                  email={user?.email}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  occupation={user?.job}
                  phoneNumber={user?.phoneNumber}
                  registrationDate={user?.createdAt}
                  username={user?.username}
                />
              )}
            </div>
            <div>{activeComponent === "courses" && <EnrolledCourses />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
