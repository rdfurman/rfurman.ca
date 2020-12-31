import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import CornerSkills from "../components/cornerskills";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  return (
    <Layout style={{ margin: `3rem auto`, maxWidth: 600 }}>
      <SEO title={data.site.siteMetadata.title} />
      <h1>Hi, my name is Randy.</h1>
      <h2>
        Experienced Software Developer and dabbler in all things devops and
        self-hosting.
      </h2>
      <p>
        <br />I am a <strong>{data.site.siteMetadata.currentJobTitle}</strong>{" "}
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
      <CornerSkills />
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
