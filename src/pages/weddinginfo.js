import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import WeddingLayout from "../components/weddinglayout";

export const Head = () => <title>Daisy & Randy 2024</title>;

const WeddingInfo = () => {
  return (
    <WeddingLayout>
      <StaticImage
        style={{
          // gridRow: 1,
          gridArea: "1/1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // opacity: 0.9 /* Adjust opacity for better readability */,
          zIndex: -1,
        }}
        layout="fullWidth"
        alt=""
        src="../images/niagra-falls.jpg"
        quality="100"
      />
      <div
        style={{
          // gridRow: 1,
          gridArea: "1/1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "normal",
          alignItems: "center",
          color: "white" /* Adjust content color for visibility */,
          padding: "2rem",
        }}
      >
        Some info here.
      </div>
    </WeddingLayout>
  );
};

export default WeddingInfo;
