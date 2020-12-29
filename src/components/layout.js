import React from "react";
import { Link } from "gatsby";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import styled from "styled-components";

const HeaderListLink = styled.li`
  display: inline-block;
  margin-right: 1rem;
`;

const ListInternalLink = (props) => (
  <HeaderListLink>
    <Link to={props.to} style={{ textShadow: "none", backgroundImage: "none" }}>
      <h4 style={{ display: "inline" }}>{props.children}</h4>
    </Link>
  </HeaderListLink>
);

const ListExternalLink = (props) => (
  <HeaderListLink>
    <a
      href={props.to}
      rel="noopener noreferrer"
      target="_blank"
      style={{ textShadow: "none", backgroundImage: "none" }}
    >
      <h4 style={{ display: "inline" }}>{props.children}</h4>
    </a>
  </HeaderListLink>
);

export default function Layout({ children }) {
  return (
    <div style={{ margin: "3rem auto", maxWidth: 1200, padding: "0 1rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <Link to="/" style={{ textShadow: "none", backgroundImage: "none" }}>
          <h2 style={{ display: "inline" }}>rfurman</h2>
        </Link>
        <ul style={{ listStyle: "none", float: "right" }}>
          <ListInternalLink to="/blog">Blog</ListInternalLink>
          <ListInternalLink to="/ludum">Ludum</ListInternalLink>
          <ListExternalLink to="/amp">AMP</ListExternalLink>
          <ListExternalLink to="https://github.com/rdfurman">
            <FaGithub size={18} />
          </ListExternalLink>
          <ListExternalLink to="https://www.linkedin.com/in/randy-furman-572406150/">
            <FaLinkedinIn size={18} />
          </ListExternalLink>
        </ul>
      </header>
      {children}
    </div>
  );
}
