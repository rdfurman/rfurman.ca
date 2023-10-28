import React from "react";
import { Link, graphql } from "gatsby";
import { css } from "@emotion/react";
import { rhythm } from "../utils/typography";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function Blog({ data }) {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>Blog</h1>
      <p>
        Just some dude hammering on a keyboard in a random corner of the
        internet.
      </p>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {posts.map((post) => (
        <div key={post.fields.slug}>
          <Link
            to={post.fields.slug}
            css={css`
              text-decoration: none;
              color: inherit;
            `}
          >
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {post.frontmatter.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {post.frontmatter.date}
              </span>
            </h3>
            <p>{post.excerpt}</p>
          </Link>
        </div>
      ))}
    </Layout>
  );
}

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
