import Lottie, { LottiePlayer } from "lottie-react";
import LoadingAnnimation from "../../public/images/LottieIFiles/loading.json";
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "white",
        zIndex: 9999,
      }}
    >
      <Lottie animationData={LoadingAnnimation} loop={true} />
    </div>
  );
};

export default Loading;
