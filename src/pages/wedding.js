import "@fontsource-variable/dancing-script";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Gallery from "../components/gallery";
import WeddingLayout from "../components/weddinglayout";

export const Head = () => <title>Daisy & Randy 2024 - Home</title>;

const WeddingHome = () => {
  return (
    <WeddingLayout>
      <div style={{ display: "grid" }}>
        <StaticImage
          style={{
            gridArea: "1/1",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
          layout="fullWidth"
          alt=""
          src="../images/wedding-bg.jpg"
          quality="100"
        />
        <div
          style={{
            gridArea: "1/1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "normal",
            alignItems: "center",
            color: "white",
            padding: "2rem",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
              textAlign: "center",
              boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.6)",
            }}
          >
            <h1
              style={{
                fontWeight: "bolder",
                fontFamily: "'Dancing Script Variable', cursive",
              }}
            >
              We're Getting Hitched!
            </h1>
            <h3
              style={{
                fontWeight: "bolder",
                fontFamily: "'Dancing Script Variable', cursive",
              }}
            >
              2024-10-18
            </h3>
            <h3 style={{ fontFamily: "'Dancing Script Variable', cursive" }}>
              Mountain-Aire Resort & Campground
            </h3>
            <h2>Please RSVP by July 31, 2024</h2>
          </div>
        </div>
        <Gallery />
      </div>
    </WeddingLayout>
  );
};

export default WeddingHome;
