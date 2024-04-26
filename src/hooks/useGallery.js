import { graphql, useStaticQuery } from "gatsby";

const useGallery = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { sourceInstanceName: { eq: "gallery" } }
        sort: { childImageSharp: { fluid: { originalName: ASC } } }
      ) {
        nodes {
          id
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `);

  return data.allFile.nodes.map((node) => ({
    ...node.childImageSharp,
    id: node.id,
  }));
};

export default useGallery;
