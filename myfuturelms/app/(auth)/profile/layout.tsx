import Banner from "@/app/components/Banner";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import TopBar from "@/app/components/Topbar";
import { ReactNode } from "react";

const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar />
      <div className="shadow-md sticky top-0 z-50">
        <Navbar />
      </div>
      <Banner />

      <main className="flex flex-col-reverse w-full max-w-7xl mx-auto sm:px-6 lg:px-8 ">
        <div> {children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
