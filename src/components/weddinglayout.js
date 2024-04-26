import { Link } from "gatsby";
import React from "react";
import { FaHome } from "react-icons/fa";
import WeddingMenu from "./weddingmenu";

export default function WeddingLayout({ children }) {
  return (
    <div>
      <header
        style={{
          padding: "15px",
          gridArea: "1/1",
          display: "flex",
          zIndex: 10,
          color: "white",
          height: "3.5rem",
          backgroundColor: "black",
        }}
      >
        <Link
          to="/wedding"
          style={{
            textShadow: "none",
            backgroundImage: "none",
            marginTop: "0.5rem",
          }}
        >
          <FaHome size={24} />
        </Link>
        <WeddingMenu />
      </header>
      {children}
    </div>
  );
}
