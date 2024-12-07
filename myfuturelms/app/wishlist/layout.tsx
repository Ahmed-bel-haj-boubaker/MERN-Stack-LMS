import { ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopBar from "../components/Topbar";
import Banner from "../components/Banner";

const FavoriteLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <TopBar />
      <div className="shadow-md sticky top-0 z-50">
        <Navbar />
      </div>
      <Banner />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default FavoriteLayout;
