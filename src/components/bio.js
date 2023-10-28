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

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;

  return (
    <AvatarContainer>
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
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
