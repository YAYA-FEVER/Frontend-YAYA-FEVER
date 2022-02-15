import React from "react";
import classes from "./LoadingScreen.module.css";
import * as loadingData from "./LoadingScreen.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const LoadingScreen = () => {
  return (
    <div className={classes.container}>
      <Lottie options={defaultOptions} height={140} width={140} className={classes.loading}/>
    </div>
  );
};

export default LoadingScreen;
