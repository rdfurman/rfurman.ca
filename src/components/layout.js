import React from "react";
import { Link } from "gatsby";
import HamburgerMenu from "./hamburgermenu";

export default function Layout({ children }) {
  return (
    <div style={{ margin: "2rem auto", maxWidth: 1200, padding: "0 1rem" }}>
      <header style={{ display: "flex" }}>
        <Link to="/" style={{ textShadow: "none", backgroundImage: "none" }}>
          <h2 style={{ display: "flex" }}>rfurman</h2>
        </Link>
        <HamburgerMenu />
      </header>
      {children}
    </div>
  );
}
