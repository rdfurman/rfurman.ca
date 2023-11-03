import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

const CornerFade = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 45%;
  height: 28%;
  background: linear-gradient(to top left, transparent 35%, white 45%);
`;

const CornerContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 45%;
  height: 28%;
  text-align: right;
  text-justify: inter-word;
`;

const CornerExclude = styled.div`
  width: 100%;
  height: 100%;
  float: left;
  shape-outside: polygon(100% 0, 0 100%, 0 0);
`;

export default function CornerSkills() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            skills
          }
        }
      }
    `
  );

  const [shuffledSkills, setShuffledSkills] = useState("");

  useEffect(() => {
    setShuffledSkills(shuffle(site.siteMetadata?.skills).join(" "));
  }, [site]);

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  return (
    <CornerContainer>
      <CornerExclude />
      <CornerFade />
      <p>{shuffledSkills}</p>
    </CornerContainer>
  );
}
