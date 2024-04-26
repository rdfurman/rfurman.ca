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
    top: 5rem;
    padding-top: 1rem;
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
  margin-left: 1rem;
  margin-bottom: 0rem;
  color: white;
`;

const ListInternalLink = (props) => (
  <HeaderListLink>
    <Link to={props.to} style={{ textShadow: "none", backgroundImage: "none" }}>
      <h4 style={{ color: "white" }}>{props.children}</h4>
    </Link>
  </HeaderListLink>
);

export default function WeddingMenu() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <StyleMenuContainer>
      <StyledLinksBox open={hamburgerOpen}>
        <ListInternalLink to="/weddinginfo">Info</ListInternalLink>
        <ListInternalLink to="https://google.ca">RSVP</ListInternalLink>
      </StyledLinksBox>
      <StyledHamburgerBox open={hamburgerOpen}>
        <FaBars size={24} onClick={() => setHamburgerOpen(!hamburgerOpen)} />
      </StyledHamburgerBox>
    </StyleMenuContainer>
  );
}
