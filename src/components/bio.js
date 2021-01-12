import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import styled from "styled-components";

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: var(--spacing-16);
`;

const BioSignOff = styled.p`
  margin-bottom: var(--spacing-0);
`;

const AvatarImage = styled.image`
  margin-right: var(--spacing-4);
  margin-bottom: var(--spacing-0);
  min-width: 50px;
  border-radius: 100%;
`;

const Bio = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
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
        <AvatarImage
          fixed={avatar}
          alt={author?.name || ``}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <BioSignOff>
          Thanks for reading. 'Till the next one.{" "}
          <span role="img" aria-label="Waving hand sign">
            👋
          </span>
        </BioSignOff>
      )}
    </AvatarContainer>
  );
};

export default Bio;
