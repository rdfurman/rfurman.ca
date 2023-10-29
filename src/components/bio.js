import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: var(--spacing-16);
`;

const FooterText = styled.p`
  padding: 10px;
`;

const BioAvatar = styled(StaticImage)`
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
  min-width: 50px;
  border-radius: 100%;
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
