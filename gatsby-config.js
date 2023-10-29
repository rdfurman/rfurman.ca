module.exports = {
  siteMetadata: {
    title: "rfurman.ca",
    description:
      "Experienced Software Developer and dabbler in all things devops and self-hosting.",
    author: {
      name: "Randy Furman",
    },
    keywords: "software,devops,developer,ludum,dare",
    siteUrl: "http://rfurman.ca",
    currentJobTitle: "Software Developer",
    currentEmployer: "Shareworks",
    currentEmployerLink: "https://www.shareworks.com/",
    pastJobTitle: "Technical Analyst",
    pastEmployer: "Golder Associates",
    pastEmployerLink: "https://www.golder.com/",
    skills: [
      "Java",
      "C#",
      ".NET",
      ".NET Core",
      "Unity",
      "React",
      "Full Stack Dev",
      "Continuous Development",
      "Docker",
      "Azure",
      "JavaScript",
      "CSS",
      "IntelliJ IDEA",
      "VSCode",
      "REST",
      "Node",
      "Oracle",
      "MSSQL",
      "Ubuntu",
      "Windows",
      "MacOS",
      "Gatsby",
      "HTML",
      "XML",
      "Visual Studio",
      "VB",
      "Office",
      "SSMS",
      "Git",
      "TFS",
      "Angular",
      "Spring",
      "Struts",
      "GWT",
      "NGINX",
      "IIS",
      "Apache",
      "Machine Learning",
      "Jenkins",
      "Design",
      "API",
      "Debugging",
      "Testing",
      "Redis",
      "Bots",
      "Hosting",
      "Network Config",
      "Servers",
      "Scripting",
      "Home Assistant",
      "Python",
      "React Native",
      "iOS",
      "Android",
      "Kotlin",
      "Swift",
      "Objective-C",
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `demonshanker2`,
        path: `${__dirname}/static/demonshanker2`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1160,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `{
              allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "rfurman.ca Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "rfurman.ca Blog",
        short_name: "Blog",
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: "src/images/icon.png",
      },
    },

    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: "gatsby-plugin-exclude",
      options: { paths: ["/webhooks/github"] },
    },
  ],
};
