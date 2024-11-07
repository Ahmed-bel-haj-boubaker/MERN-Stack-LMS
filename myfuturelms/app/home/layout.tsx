import { ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopBar from "../components/Topbar";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar />
      <div className="shadow-md sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
