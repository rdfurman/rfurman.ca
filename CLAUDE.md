# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Gatsby 5, featuring a blog and Unity WebGL game integration (Demon Shanker 2). The site uses React 18, styled-components, and Emotion for styling, with Typography.js (Funston theme) for typography.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:8000)
npm run develop
# or
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clean Gatsby cache and public directory
npm run clean
```

### Common Development Workflow

When making changes that affect GraphQL queries or Gatsby's data layer:
1. Run `npm run clean` to clear caches
2. Restart development server with `npm run develop`

## Architecture

### Layout System

The site uses a single layout component:

**`Layout`** (`src/components/layout.js`) - Main site layout with header link to "/" and HamburgerMenu
- Used by: all pages (home, blog, 404, Ludum Dare)

### Content Sources and Data Layer

Gatsby sources content from two filesystem locations (configured in `gatsby-config.js`):

1. **`content/blog`** - Blog posts as Markdown files
2. **`static/demonshanker2`** - Unity WebGL game build files

The data flows through Gatsby's Node API (`gatsby-node.js`):

1. **`onCreateNode`**: Creates slug fields for markdown files automatically
2. **`createPages`**: Generates blog post pages dynamically from markdown using `src/templates/blog-post.js`
3. **`createSchemaCustomization`**: Defines GraphQL schema types for site metadata and markdown frontmatter

### Blog Post System

Blog posts are created programmatically:
- **Source**: Markdown files in `content/blog/` with frontmatter (`title`, `date`, `description`)
- **Template**: `src/templates/blog-post.js` renders individual posts
- **Navigation**: Previous/next post links generated automatically based on date sort order
- **GraphQL**: Query in template fetches post data and adjacent posts for navigation

### Unity WebGL Integration

The `DemonShanker2` component (`src/components/demonshanker2.js`) integrates Unity WebGL:
- Uses `react-unity-webgl` library
- Implements lazy loading with "Play" button to reduce initial page load
- Shows loading progress bar during asset loading
- Properly unmounts Unity instance on component cleanup
- Game files located in `/static/demonshanker2/Build/`
- **Fixed dimensions**: 1160x680px (update in component if game rebuild changes canvas size)

### Site Metadata

Extensive site metadata in `gatsby-config.js` includes:
- Personal info (name, job titles, employers)
- Skills array (comprehensive list of technologies)
- SEO data (title, description, keywords)

**Important**: Update `siteUrl` to use HTTPS when deploying to production (currently set to `http://rfurman.ca`)

## Styling Approach

Mixing two styling approaches (historical evolution):
1. **styled-components** - Primary styling system (most components)
2. **Emotion** - Used alongside styled-components

When adding styles, prefer styled-components for consistency.

## Key Configuration Files

- **`gatsby-config.js`** - All plugins, site metadata, image processing config
- **`gatsby-node.js`** - Dynamic page creation, node field creation, schema customization
- **`src/utils/typography.js`** - Typography.js configuration (Funston theme)

## GraphQL Queries

When writing GraphQL queries:
- Blog posts: Use `allMarkdownRemark` with frontmatter (`title`, `date`, `description`)
- Images: Use `gatsby-plugin-image` with `gatsbyImageData` fragment
- Site metadata: Query from `site.siteMetadata`

## Plugin Dependencies

Core Gatsby plugins in use:
- Image processing: `gatsby-plugin-image`, `gatsby-plugin-sharp`, `gatsby-transformer-sharp`, `gatsby-remark-images`
- Content: `gatsby-source-filesystem`, `gatsby-transformer-remark`, `gatsby-plugin-mdx`
- Styling: `gatsby-plugin-styled-components`, `gatsby-plugin-emotion`, `gatsby-plugin-typography`
- SEO/Utilities: `gatsby-plugin-react-helmet`, `gatsby-plugin-manifest`, `gatsby-plugin-sitemap`, `gatsby-plugin-feed`
- Custom: `gatsby-plugin-exclude` (excludes `/webhooks/github` from build)

## Known Considerations

- **React Unity WebGL version**: Currently on v9.9.0. Be cautious upgrading to v10.x (major version) without thorough testing of the game integration.
- **Security status**: Project upgraded to Gatsby 5.15.0 and React 18.3.1 in December 2024. npm audit shows 27 vulnerabilities (0 critical, 0 high). See `UPGRADE_PLAN.md` for details.
- **Typography theme**: Uses external package `typography-theme-funston` - theming changes should be made carefully to preserve visual design.
