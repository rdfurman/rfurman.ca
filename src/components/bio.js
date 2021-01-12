import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
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
    query {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
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
  const avatar = data?.avatar?.childImageSharp?.fixed;

  return (
    <AvatarContainer>
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
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
