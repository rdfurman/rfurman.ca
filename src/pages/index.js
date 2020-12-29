import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  return (
    <Layout style={{ margin: `3rem auto`, maxWidth: 600 }}>
      <h1>WhoAmI</h1>
      <p>
        I am a <strong>{data.site.siteMetadata.currentJobTitle}</strong>{" "}
        currently employed by{" "}
        <a
          href={data.site.siteMetadata.currentEmployerLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.site.siteMetadata.currentEmployer}
        </a>
        .
        <br />
        And I was a <strong>
          {data.site.siteMetadata.pastJobTitle}
        </strong> at{" "}
        <a
          href={data.site.siteMetadata.pastEmployerLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.site.siteMetadata.pastEmployer}
        </a>{" "}
        in a past life.
      </p>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        pastJobTitle
        pastEmployerLink
        pastEmployer
        description
        currentJobTitle
        currentEmployerLink
        currentEmployer
      }
    }
  }
`;
