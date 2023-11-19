import { Button } from "antd";
import Lottie from "lottie-react";
import LottieNotFound from "../assets/notFound-animation.json";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen text-center">
      <Lottie animationData={LottieNotFound} className="md:w-96 m-auto" />
      <div className="">Sorry, you are not authorized to access this page.</div>
      <Link to={"/"}>
        <Button type="link">Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
