import { Link } from "gatsby";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

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
    top: 3.48rem;
    right: 0;
    text-align: center;
    background: black;
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
  padding-top: 0.5rem;
  padding-left: 1rem;
  color: white;
`;

const ListInternalLink = (props) => (
  <HeaderListLink>
    <Link to={props.to}>
      <h4>{props.children}</h4>
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

export default function WeddingMenu() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <StyleMenuContainer>
      <StyledLinksBox open={hamburgerOpen}>
        <ListInternalLink to="/weddinginfo">Info</ListInternalLink>
        <ListExternalLink to="https://google.ca">RSVP</ListExternalLink>
      </StyledLinksBox>
      <StyledHamburgerBox open={hamburgerOpen}>
        <FaBars size={24} onClick={() => setHamburgerOpen(!hamburgerOpen)} />
      </StyledHamburgerBox>
    </StyleMenuContainer>
  );
}
