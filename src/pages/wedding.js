import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const WeddingPage = () => {
  return (
    <div
      style={{
        display: "grid",
        minHeight: "100vh",
      }}
    >
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
        src="../images/wedding-bg.jpg"
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
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            paddingTop: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontWeight: "bolder", fontFamily: "cursive" }}>
            We're Getting Hitched!
          </h1>
          <h3>2024-10-18</h3>
          <p>Out in the bush.</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingPage;
