import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "gatsby";

const StyleMenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledLinksBox = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};

    // mobile menu
    flex-direction: column;
    position: absolute;
    width: 100%;
    top: 5rem;
    text-align: center;
    background: white;
  }
`;

const StyledHamburgerBox = styled.div`
  display: none;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HeaderListLink = styled.div`
  margin-left: 1rem;
  margin-bottom: 0rem;
`;

const ListInternalLink = (props) => (
  <HeaderListLink>
    <Link to={props.to} style={{ textShadow: "none", backgroundImage: "none" }}>
      <h4 style={{}}>{props.children}</h4>
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
      <h4 style={{}}>{props.children}</h4>
    </a>
  </HeaderListLink>
);

export default function HamburgerMenu() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <StyleMenuContainer>
      <StyledLinksBox open={hamburgerOpen}>
        <ListInternalLink to="/blog">Blog</ListInternalLink>
        <ListInternalLink to="/ludum">Ludum</ListInternalLink>
        <ListExternalLink to="https://amp.rfurman.ca">AMP</ListExternalLink>
        <ListExternalLink to="https://github.com/rdfurman">
          <FaGithub size={18} />
        </ListExternalLink>
        <ListExternalLink to="https://www.linkedin.com/in/randy-furman-572406150/">
          <FaLinkedin size={18} />
        </ListExternalLink>
      </StyledLinksBox>
      <StyledHamburgerBox open={hamburgerOpen}>
        <FaBars size={18} onClick={() => setHamburgerOpen(!hamburgerOpen)} />
      </StyledHamburgerBox>
    </StyleMenuContainer>
  );
}
