# Gatsby Project Upgrade Plan

## Executive Summary

⚠️ **CRITICAL SECURITY CONCERN** ⚠️

This Gatsby project has **150 Dependabot security alerts** with varying severity levels:
- **14 Critical** vulnerabilities (including arbitrary code execution, SSRF, prototype pollution)
- **74 High** severity vulnerabilities
- **51 Medium** severity vulnerabilities
- **11 Low** severity vulnerabilities

Additionally, `npm audit` reports 41 vulnerabilities (1 critical, 15 high, 11 moderate, 14 low) in installed dependencies.

**The discrepancy between npm audit and Dependabot** exists because Dependabot scans the entire dependency tree more comprehensively and includes historical vulnerabilities across all transitive dependencies. Both tools are identifying real security issues that need attention.

This plan outlines a comprehensive strategy to upgrade the project to the latest stable versions and resolve all security issues. **Given the critical vulnerabilities involving arbitrary code execution, this upgrade should be prioritized.**

## Dependabot Alert Summary

GitHub Dependabot has identified **150 open security alerts** across the dependency tree. Here's a breakdown of the most critical issues:

### Critical Vulnerabilities (14 Total)

These vulnerabilities pose immediate security risks and should be addressed urgently:

| Package | CVE | Severity | Issue | Patched Version |
|---------|-----|----------|-------|-----------------|
| **@babel/traverse** | CVE-2023-45133 | Critical | Arbitrary code execution when compiling malicious code | 7.23.2+ |
| **xmlhttprequest-ssl** | CVE-2020-28502, CVE-2021-31597 | Critical | Arbitrary code injection, improper certificate validation | 1.6.2+ |
| **socket.io-parser** | CVE-2022-2421 | Critical | Insufficient validation when decoding packets | 3.3.3+, 3.4.2+ |
| **underscore** | CVE-2021-23358 | Critical | Arbitrary code execution | 1.12.1+ |
| **minimist** | CVE-2021-44906 | Critical | Prototype pollution | 1.2.6+ |
| **loader-utils** | CVE-2022-37601 | Critical | Prototype pollution in webpack | 1.4.1+ |
| **json-schema** | CVE-2021-3918 | Critical | Prototype pollution | 0.4.0+ |
| **url-parse** | CVE-2022-0686 | Critical | Authorization bypass through user-controlled key | 1.5.8+ |
| **parse-url** | CVE-2022-2216, CVE-2022-2900 | Critical | Server-Side Request Forgery (SSRF) | 6.0.1+, 8.1.0+ |
| **eventsource** | CVE-2022-1650 | Critical | Exposure of sensitive information | 1.1.1+ |
| **form-data** | CVE-2025-7783 | Critical | Unsafe random function for boundary (NEW 2025) | 4.0.4+ |

### High Severity Vulnerabilities (74 Total - Sample of Key Issues)

| Package | CVE | Issue | Status |
|---------|-----|-------|--------|
| **axios** | CVE-2025-58754 (NEW) | DoS through lack of data size check | Patch: 0.30.2+ |
| **axios** | Multiple | SSRF, credential leakage, ReDoS | Patch available |
| **tar-fs** | CVE-2025-59343 (NEW) | Symlink validation bypass, path traversal | Patch: 2.1.4+, 3.1.1+ |
| **@babel/traverse** | - | Multiple RCE vulnerabilities | Patch available |
| **braces** | - | Uncontrolled resource consumption | Patch available |
| **cross-spawn** | - | Regular Expression Denial of Service (ReDoS) | Patch available |
| **decode-uri-component** | - | Denial of Service (DoS) | Patch available |
| **dns-packet** | - | Potential memory exposure | Patch available |
| **browserify-sign** | - | Signature forgery attack | Patch available |
| **ansi-regex** | - | Inefficient regular expression complexity | Patch available |

### Medium Severity Vulnerabilities (51 Total)

Includes issues in:
- **js-yaml** (CVE-2025-64718 - NEW): Prototype pollution in merge
- **@parcel/reporter-dev-server** (CVE-2025-56648): Origin validation error
- **@babel/runtime & @babel/helpers**: Inefficient RegExp complexity
- **webpack**: DOM Clobbering leading to XSS
- Various other packages with DoS, prototype pollution, and validation issues

### Low Severity Vulnerabilities (11 Total)

Includes:
- **tmp** (CVE-2025-54798 - NEW): Arbitrary temp file write via symbolic link

## Current State Analysis

### Environment
- **Node.js**: v20.18.1 ✅ (Current and supported)
- **npm**: v11.5.2 ✅ (Current)
- **Gatsby**: v5.13.4 (Outdated - v5.15.0 available)
- **React**: v18.2.0 (Outdated - v18.3.1 available, v19.2.1 also available)

### npm audit Vulnerabilities (41 Total)

#### High Priority (Critical & High Severity)

1. **sharp** (Critical/High)
   - Buffer overflow vulnerability
   - DoS attacks via crafted images
   - Path traversal issues
   - **Impact**: Image processing vulnerabilities can lead to server compromise

2. **axios** (High)
   - Cross-Site Request Forgery (CSRF) vulnerability
   - DoS attack through lack of data size check
   - SSRF and credential leakage via absolute URL
   - **Impact**: Data exposure and service disruption

3. **webpack-dev-middleware** (High)
   - Path traversal vulnerability (CVE-2024-43788)
   - **Impact**: Unauthorized file access during development

4. **postcss** (High)
   - ReDoS (Regular Expression Denial of Service)
   - Line return parsing issues
   - **Impact**: Service disruption

5. **tar-fs** (High)
   - Path traversal via crafted tar files
   - Link following vulnerability
   - **Impact**: Arbitrary file writes

6. **ws** (High)
   - DoS when handling requests with many HTTP headers
   - **Impact**: WebSocket service disruption

#### Moderate Priority

7. **webpack** (Moderate)
   - DOM Clobbering Gadget leading to XSS
   - **Impact**: Cross-site scripting attacks

8. **@babel/runtime & @babel/helpers** (Moderate)
   - Inefficient RegExp complexity
   - **Impact**: Performance degradation

9. **@parcel/reporter-dev-server** (Moderate)
   - Origin validation error
   - **Impact**: Information disclosure

### Outdated Dependencies

All major dependencies have updates available:

| Package | Current | Latest | Type |
|---------|---------|--------|------|
| gatsby | 5.13.4 | 5.15.0 | Major Framework |
| react | 18.2.0 | 18.3.1 (19.2.1) | Core Library |
| react-dom | 18.2.0 | 18.3.1 (19.2.1) | Core Library |
| All gatsby-plugin-* | 5.13.1/6.13.1/7.13.1/8.13.1 | 5.15.0/6.15.0/7.15.0/8.15.0 | Plugins |
| styled-components | 6.1.8 | 6.1.19 | Styling |
| react-icons | 5.1.0 | 5.5.0 | UI Components |
| react-unity-webgl | 9.5.2 | 10.1.6 | Unity Integration |
| @emotion/react | 11.11.4 | 11.14.0 | Styling |

## Recommended Upgrade Strategy

### Phase 1: Preparation (Risk: Low)

**Objective**: Prepare the environment and create safety nets

1. **Create a backup branch**
   ```bash
   git checkout -b upgrade-gatsby-5.15
   ```

2. **Document current functionality**
   - Test all pages and features manually
   - Document any custom configurations
   - Take screenshots of working site

3. **Review breaking changes**
   - Check Gatsby 5.15.0 release notes
   - Check React 18.3.1 release notes
   - Review plugin changelogs

### Phase 2: Dependency Updates (Risk: Medium)

**Objective**: Update all dependencies to latest compatible versions

1. **Update package.json**

   Update the following dependencies:

   ```json
   {
     "dependencies": {
       "@emotion/react": "^11.14.0",
       "@fontsource-variable/dancing-script": "^5.2.8",
       "babel-plugin-styled-components": "^2.1.4",
       "gatsby": "^5.15.0",
       "gatsby-plugin-emotion": "^8.15.0",
       "gatsby-plugin-exclude": "^1.0.2",
       "gatsby-plugin-feed": "^5.15.0",
       "gatsby-plugin-image": "^3.15.0",
       "gatsby-plugin-manifest": "^5.15.0",
       "gatsby-plugin-mdx": "^5.15.0",
       "gatsby-plugin-react-helmet": "^6.15.0",
       "gatsby-plugin-sharp": "^5.15.0",
       "gatsby-plugin-sitemap": "^6.15.0",
       "gatsby-plugin-styled-components": "^6.15.0",
       "gatsby-plugin-typography": "^5.15.0",
       "gatsby-remark-images": "^7.15.0",
       "gatsby-source-filesystem": "^5.15.0",
       "gatsby-transformer-remark": "^6.15.0",
       "gatsby-transformer-sharp": "^5.15.0",
       "react": "^18.3.1",
       "react-dom": "^18.3.1",
       "react-helmet": "^6.1.0",
       "react-icons": "^5.5.0",
       "react-typography": "^0.16.23",
       "react-unity-webgl": "^9.9.0",
       "styled-components": "^6.1.19",
       "typography": "^0.16.24",
       "typography-theme-funston": "^0.16.19"
     }
   }
   ```

2. **Clean install**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Run security audit fix**
   ```bash
   npm audit fix
   ```

4. **Review audit results**
   ```bash
   npm audit
   ```
   - If vulnerabilities remain, run `npm audit fix --force` (use with caution)
   - Document any remaining vulnerabilities that cannot be auto-fixed

### Phase 3: Code Updates (Risk: Medium)

**Objective**: Update code to work with new dependencies

1. **Check for deprecated APIs**
   - Review Gatsby deprecation warnings
   - Update any deprecated plugin configurations in `gatsby-config.js`
   - Check for React 18.3 deprecations

2. **Update gatsby-config.js if needed**
   - Ensure all plugin versions are compatible
   - Update any deprecated configuration options

3. **Review TypeScript/PropTypes issues** (if applicable)
   - Update type definitions if needed
   - Fix any new type errors

### Phase 4: Testing (Risk: Low)

**Objective**: Ensure all functionality works correctly

1. **Development testing**
   ```bash
   npm run clean
   npm run develop
   ```
   - Test all pages load correctly
   - Verify images render properly
   - Check all internal links work
   - Test Unity WebGL integration (demonshanker2)
   - Verify typography rendering
   - Check responsive design

2. **Build testing**
   ```bash
   npm run build
   npm run serve
   ```
   - Ensure build completes without errors
   - Test production build locally
   - Check bundle sizes haven't grown significantly
   - Verify sitemap generation
   - Test RSS feed generation

3. **Browser testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Test mobile responsiveness
   - Check console for errors
   - Verify all interactive elements work

### Phase 5: Deployment (Risk: Low)

**Objective**: Deploy upgraded site to production

1. **Pre-deployment checklist**
   - All tests passing
   - No console errors
   - Build successful
   - Security audit clean (or acceptable)

2. **Deploy to staging** (if available)
   - Test in staging environment
   - Perform smoke tests

3. **Deploy to production**
   ```bash
   git add .
   git commit -m "Upgrade Gatsby to 5.15.0 and resolve security vulnerabilities"
   git push origin upgrade-gatsby-5.15
   ```
   - Create pull request
   - Review changes
   - Merge to main/master
   - Deploy

4. **Post-deployment verification**
   - Verify site loads correctly
   - Check analytics are working
   - Monitor error logs

## Potential Issues and Mitigations

### Issue 1: React Unity WebGL Compatibility
**Risk**: react-unity-webgl update from 9.5.2 → 9.9.0 (10.1.6 available but major version)
**Mitigation**:
- Test Unity game integration thoroughly
- Check release notes for breaking changes
- Consider staying on 9.9.0 for now, delay 10.x upgrade

### Issue 2: Sharp Image Processing
**Risk**: Critical security vulnerabilities in sharp
**Mitigation**:
- Update sharp to latest version via `npm audit fix`
- Test all image processing thoroughly
- Verify gatsby-plugin-sharp and gatsby-plugin-image work correctly

### Issue 3: Styled Components
**Risk**: Minor version updates might have subtle styling changes
**Mitigation**:
- Visual regression testing
- Check all styled components render correctly
- Review emotion/styled-components interplay

### Issue 4: Build Performance
**Risk**: Newer versions might have different build performance
**Mitigation**:
- Benchmark build times before and after
- Monitor bundle sizes
- Optimize if necessary

## Alternative Strategies

### Conservative Approach (Lower Risk)
If the above approach seems too aggressive:

1. **Step 1**: Run `npm audit fix` only
   - Fixes vulnerabilities without major version changes
   - Lower risk of breaking changes

2. **Step 2**: Update Gatsby plugins only
   - Keep Gatsby core and React at current versions
   - Update plugins to patch versions

3. **Step 3**: Update to Gatsby 5.15 (minor version)
   - Smaller jump, less risk

4. **Step 4**: Update React 18.2 → 18.3.1
   - Patch/minor update, very low risk

### Aggressive Approach (Higher Risk, More Benefits)
For maximum modernization:

1. **Consider React 19 upgrade**
   - React 19.2.1 is available
   - Significant new features and performance improvements
   - **Warning**: May have breaking changes, requires thorough testing

2. **Consider Gatsby 6 migration** (when stable)
   - Check if Gatsby 6 is production-ready
   - Major version upgrade with potential breaking changes
   - Better performance and new features

## Post-Upgrade Maintenance

### Ongoing Security
1. **Enable automated dependency updates**
   - Enable Dependabot automated PRs in GitHub repository settings
   - Configure Dependabot to auto-update security patches
   - Review and merge Dependabot PRs weekly

2. **Regular security audits**
   - Run `npm audit` monthly
   - Check Dependabot alerts weekly: `gh api repos/rdfurman/rfurman.ca/dependabot/alerts`
   - Monitor GitHub Security tab for new alerts
   - Subscribe to GitHub security advisories

3. **Keep Node.js updated**
   - Monitor Node.js LTS releases
   - Update to latest LTS when available
   - Current: Node 20.x (supported until April 2026)

### Dependency Management
1. **Use exact versions for critical dependencies**
   - Consider using exact versions instead of `^` for production
   - Prevents unexpected updates

2. **Regular dependency review**
   - Quarterly dependency update cycle
   - Review and update outdated packages

3. **Monitor bundle size**
   - Use webpack-bundle-analyzer
   - Keep production bundle optimized

## Timeline Estimate

| Phase | Duration | Effort |
|-------|----------|--------|
| Phase 1: Preparation | 1-2 hours | Low |
| Phase 2: Dependency Updates | 30 minutes | Low |
| Phase 3: Code Updates | 2-4 hours | Medium |
| Phase 4: Testing | 2-4 hours | Medium |
| Phase 5: Deployment | 1 hour | Low |
| **Total** | **6-11 hours** | **Medium** |

*Note: Timeline assumes no major breaking changes discovered during testing*

## Success Criteria

- ✅ All npm audit vulnerabilities (41) resolved or mitigated
- ✅ Significant reduction in Dependabot alerts (target: <20 remaining, ideally 0)
- ✅ All 14 critical Dependabot vulnerabilities resolved
- ✅ High-priority high-severity vulnerabilities addressed (axios, tar-fs, @babel/traverse)
- ✅ All dependencies updated to latest compatible versions
- ✅ Site builds without errors or warnings
- ✅ All pages load and function correctly
- ✅ Images render properly (sharp working correctly)
- ✅ Unity WebGL game loads and plays
- ✅ No console errors in browser
- ✅ RSS feed generates correctly
- ✅ Sitemap generates correctly
- ✅ Mobile responsive design works
- ✅ Production build successful and deployed
- ✅ GitHub Dependabot dashboard shows minimal alerts

## Rollback Plan

If critical issues are discovered:

1. **Immediate rollback**
   ```bash
   git checkout master
   git push origin master --force
   ```

2. **Investigate issues**
   - Review error logs
   - Identify problematic dependency
   - Create fix in upgrade branch

3. **Retry deployment**
   - Fix issues
   - Re-test
   - Re-deploy

## Resources

### Documentation
- [Gatsby 5.x Migration Guide](https://www.gatsbyjs.com/docs/reference/release-notes/)
- [React 18.3 Release Notes](https://react.dev/blog)
- [npm audit documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

### Security Monitoring
- [GitHub Dependabot Alerts for this repo](https://github.com/rdfurman/rfurman.ca/security/dependabot)
- [GitHub Security Advisories](https://github.com/advisories)
- Check alerts via CLI: `gh api repos/rdfurman/rfurman.ca/dependabot/alerts`

### Key CVE References
- [CVE-2023-45133 - Babel RCE](https://nvd.nist.gov/vuln/detail/CVE-2023-45133)
- [CVE-2025-58754 - Axios DoS (NEW)](https://nvd.nist.gov/vuln/detail/CVE-2025-58754)
- [CVE-2025-59343 - tar-fs Path Traversal (NEW)](https://nvd.nist.gov/vuln/detail/CVE-2025-59343)
- [CVE-2025-7783 - form-data Boundary Issue (NEW)](https://nvd.nist.gov/vuln/detail/CVE-2025-7783)

## Conclusion

This upgrade plan addresses **150 Dependabot security alerts** and critical security vulnerabilities while modernizing the project's dependencies. The recommended approach balances risk with benefits, using a phased strategy that allows for testing and validation at each step. Following this plan will result in a more secure, maintainable, and performant Gatsby site.

### Urgency Assessment

**Priority Level: HIGH** ⚠️

The presence of 14 critical vulnerabilities, including multiple instances of:
- **Arbitrary code execution** (@babel/traverse, underscore, xmlhttprequest-ssl)
- **Prototype pollution** (minimist, loader-utils, json-schema, js-yaml)
- **Server-Side Request Forgery** (parse-url)
- **Authorization bypass** (url-parse)

...makes this upgrade urgent. While this is a personal portfolio site with likely limited attack surface, these vulnerabilities could be exploited if:
1. An attacker can influence input to the build process
2. The site processes user-generated content
3. Dependencies are used in other projects

### Recommended Action Plan

**Recommendation**: Proceed with the main upgrade strategy (Phases 1-5) as outlined above with the following priorities:

1. **Immediate (Week 1)**:
   - Update all direct dependencies (gatsby, react, plugins) to latest versions
   - Run `npm audit fix` to auto-resolve fixable vulnerabilities
   - Address critical vulnerabilities in transitive dependencies

2. **Short-term (Week 2)**:
   - Complete testing of upgraded site
   - Deploy to production
   - Verify Dependabot alert reduction

3. **Ongoing**:
   - Enable Dependabot automated PRs
   - Set up monthly security review cycle
   - Monitor for new vulnerabilities

The conservative approach of updating to Gatsby 5.15.0 and React 18.3.1 provides significant security improvements with minimal breaking change risk. Many vulnerabilities will be automatically resolved by updating the top-level dependencies, as Gatsby's newer versions include updated transitive dependencies with security patches.

### Understanding npm audit vs Dependabot

Both tools serve important but different purposes:
- **npm audit**: Scans installed packages in `node_modules` and provides actionable fixes
- **Dependabot**: Scans `package-lock.json` comprehensively, including all transitive dependencies and historical vulnerabilities

The 150 Dependabot alerts vs 41 npm audit findings doesn't mean Dependabot is wrong—it's being more thorough. After running the upgrade (which updates `package-lock.json`), many Dependabot alerts should auto-resolve as updated packages pull in patched transitive dependencies.
