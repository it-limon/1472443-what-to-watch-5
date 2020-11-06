import React from "react";
import ReactLoading from "react-loading";

const LoaderPage = () => {
  return (
    <div className="user-page" style={{display: `flex`, justifyContent: `center`, alignItems: `center`, height: `100vh`}}>
      <ReactLoading
        type="bubbles"
        color="#d9cd8d"
        width="5%"
        height="auto"
      />
    </div>
  );
};

export default LoaderPage;
