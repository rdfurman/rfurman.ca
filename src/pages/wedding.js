import { graphql } from "gatsby";
import React from "react";

const WeddingPage = ({ data }) => {
  return (
    <div>
      <h1>Furman Wedding</h1>
      <h2>Make something nice here.</h2>
      <p>To be made pretty.</p>
    </div>
  );
};

export default WeddingPage;

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
