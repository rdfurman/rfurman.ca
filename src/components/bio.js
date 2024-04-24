import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: var(--spacing-16);
`;

const FooterText = styled.p`
  padding: 10px;
`;

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;

  return (
    <AvatarContainer>
      {author?.name && (
        <FooterText>
          Thanks for reading. 'Till the next one.{" "}
          <span role="img" aria-label="Waving hand sign">
            👋
          </span>
        </FooterText>
      )}
    </AvatarContainer>
  );
};

export default Bio;
