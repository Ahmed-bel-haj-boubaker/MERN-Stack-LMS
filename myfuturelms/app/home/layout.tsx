"use client";
import { ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopBar from "../components/Topbar";
import dynamic from "next/dynamic";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  const Loading = dynamic(() => import("../components/Loading"), {
    ssr: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <div>
      {!isLoaded ? (
        <Loading />
      ) : (
        <>
          <TopBar />
          <div className="shadow-md sticky top-0 z-50">
            <Navbar />
          </div>
          <main>{children}</main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomeLayout;
