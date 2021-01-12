module.exports = {
  siteMetadata: {
    title: "rfurman.ca",
    description:
      "Experienced Software Developer and dabbler in all things devops and self-hosting.",
    author: {
      name: "Randy Furman",
      summary: "who lives and works in San Francisco building useful things.",
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
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/content/assets/icon.png",
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./src/content/",
      },
      __key: "content",
    },
    "gatsby-plugin-emotion",
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
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
  ],
};
