---
name: fix-dependabot
description: Analyze and fix npm / GitHub Dependabot security vulnerabilities for this Gatsby site. Use when asked to address dependabot alerts, npm audit findings, or security vulnerabilities in dependencies.
---

# Fix Dependabot / npm security issues

Workflow for resolving dependency vulnerabilities on this Gatsby 5 site. The
goal is **zero high/critical** with a clean `npm run build` and a lock file CI
can install — *without* downgrading Gatsby.

## Guiding principle

Most vulnerabilities are transitive deps deep inside the Gatsby tree. Fix them
**as close to the source as possible**, in this order of preference:

1. **Upgrade Gatsby + its plugins** (and run `npm audit fix`) — clears issues at
   the source and keeps you current.
2. **Targeted `overrides`** for transitive deps a Gatsby upgrade can't reach.

Never accept `npm audit fix --force`'s usual "fix": it **downgrades Gatsby**
(e.g. to 5.12.12), a breaking regression. Upgrade Gatsby, never downgrade it.

## Steps

### 1. Assess — use BOTH npm audit and Dependabot
`npm audit` and GitHub Dependabot don't always agree (different advisory DBs,
reachability/dev-vs-prod filtering). Check both; the Dependabot **alerts** are
the source of truth for what GitHub tracks and reports.

**GitHub Dependabot alerts** (`gh` substitutes the current repo into `{owner}/{repo}`):
```bash
gh api repos/{owner}/{repo}/dependabot/alerts --paginate \
  --jq '.[] | select(.state=="open")
        | "\(.security_advisory.severity)\t\(.dependency.package.name)\t\(.security_advisory.summary)"' \
  | sort | uniq -c
```
Browse details in the UI if needed: `gh repo view --web` → Security → Dependabot.
(If `gh api` returns 403, the token lacks `security_events` scope — tell the user
to read alerts from the Security tab instead.)

**npm audit** — then collapse to the *root* vulnerable packages (ignore the
transitive noise):
```bash
npm audit                 # human-readable
npm audit --json | node -e '
const d=JSON.parse(require("fs").readFileSync(0));
for(const [k,v] of Object.entries(d.vulnerabilities))
  if(v.via.some(x=>typeof x==="object"))
    console.log(k,"| sev:",v.severity,"| range:",v.range,"| fix:",JSON.stringify(v.fixAvailable));'
```
`fix.isSemVerMajor: true` or `fix.name: "gatsby"` = audit wants a breaking
downgrade. Don't `--force` those — resolve them via a Gatsby upgrade (step 2) or
an override (step 4) instead.

Reconcile the two lists. Anything Dependabot flags that `npm audit` doesn't
still needs a fix (same techniques: upgrade or override). Anything `npm audit`
flags that Dependabot ignores is usually a dev-only/unreachable path — still
worth fixing, but lower priority.

### 2. Upgrade Gatsby and its plugins FIRST
Try to clear vulnerabilities at the source by moving to the latest Gatsby
release line before reaching for overrides.

```bash
# current vs latest
npm ls gatsby | grep -oE 'gatsby@[0-9.]+' | head -1
npm view gatsby version
```
If a newer Gatsby exists, bump `gatsby` and every `gatsby-*`/`gatsby-plugin-*`
dependency in `package.json` to the matching latest minor, then:
```bash
npm install
npm run build              # confirm the upgrade didn't break anything
npm audit                  # re-assess what's left
```

**But verify the upgrade actually reaches the vulnerable dep** before assuming it
helps. Check whether the latest intermediate package still pins the bad version:
```bash
npm view gatsby-core-utils version
npm view gatsby-core-utils dependencies.file-type   # e.g. still ^16.5.4 -> upgrade won't help
```
If even the latest Gatsby stack still depends on the vulnerable version (as is
the case for `file-type` — see Known residual), an upgrade can't fix it; move on
to overrides. If we're **already on the latest Gatsby**, skip to the next step.

### 3. Non-breaking fixes
```bash
npm audit fix             # NOT --force
```
This clears the cleanly-patchable ones (axios, babel, ws, yaml, etc.).

### 4. Targeted overrides for the rest
For each remaining root package, **verify compatibility before overriding** —
a blanket override can break the build:

- Check installed vs latest: `npm view <pkg> version`, `npm ls <pkg>`.
- **Same major line?** Safe (e.g. `lodash` 4.17→4.18, `path-to-regexp` 0.1.12→0.1.13).
- **Major jump?** Check how Gatsby consumes it:
  - ESM-only patched version + CJS consumer (`require("<pkg>")`) = **DO NOT override**, it breaks the build. Confirm with `npm view <pkg>@<fixed> type` (`module` = ESM-only) and `grep -rn 'require("<pkg>")' node_modules/<consumer>/dist`.
  - Named-export usage (`_uuid.v4`, `_uuid.v5`) survives major bumps that only removed the *default* export — check with `grep -rn '<pkg>' node_modules/gatsby/dist/**/*.js`.

Add survivors to the `overrides` block in `package.json`, e.g.:
```json
"lodash": "^4.18.1",
"path-to-regexp": ">=0.1.13 <0.2.0",
"uuid": ">=11.1.1"
```
Then `npm install`.

### 5. Verify
```bash
npm run build             # must succeed
npm ls lodash path-to-regexp uuid   # confirm overrides resolved
npm audit                 # confirm 0 high/critical
```

### 6. Keep the lock file's npm version aligned with CI (IMPORTANT)
The lock file is generated by **npm 11**, which resolves optional peer deps
(`@swc/helpers`, `tslib`) differently from npm 10. If CI's npm differs, `npm ci`
fails with "Missing X from lock file".

- The repo pins Node via **`.nvmrc` (`lts/krypton` = Node 24)**, and
  `.github/workflows/main.yml` uses `node-version-file: '.nvmrc'`. Node 24
  bundles npm 11, so the lock stays in sync with no extra step.
- Generate the lock locally on the same Node/npm (`nvm use`).
- Verify sync before pushing: `npm ci --dry-run` (should say "up to date").
- If you ever drop CI back to Node 20 (bundled npm 10), re-add an
  `npm install -g npm@11` step before `npm ci`, or regenerate the lock with npm 10.

### 7. Commit & push
Per AGENTS.md: **single-line commit messages, no `Co-Authored-By`.** This is a
personal site — commit straight to `master` and push. Then optionally watch CI:
```bash
gh run watch $(gh run list --branch master --limit 1 --json databaseId -q '.[0].databaseId') --exit-status
```

### 8. Confirm Dependabot caught up
The `git push` banner ("GitHub found N vulnerabilities…") is the **pre-push**
count — it's printed before Dependabot rescans the new commit, so ignore it.
Give Dependabot a minute, then re-run the step-1 alert query to confirm the
fixed alerts moved to `state: "fixed"` and only the known residual(s) remain:
```bash
gh api repos/{owner}/{repo}/dependabot/alerts --paginate \
  --jq '[.[] | select(.state=="open")] | length'   # expect only known residuals
```

## Known residuals

Both are **build-tool vulnerabilities in code paths Gatsby never executes** —
accepted as known open Dependabot alerts, not fixed. Don't try to "fix" either by
forcing an incompatible version; that just adds breakage or log noise (see below).

### `file-type` (medium, ASF-parser infinite loop, GHSA-5v7r-6r5c-r473)
Fixed only in 21.3.1, which is ESM with a new API (`fileTypeFromFile`), but
`gatsby-core-utils` calls the old `_fileType.default.fromFile(...)` — so an
override loads a broken code path; downgrading `gatsby-source-filesystem` is a
breaking regression. **Unreachable:** file-type's only caller is
`gatsby-core-utils`' `fetchRemoteFile`, and this site sources zero remote files
(all images local), so the ASF parser never runs. Re-check after Gatsby migrates
off file-type 16.x.

### `@parcel/reporter-dev-server` (moderate, Origin Validation, GHSA-qm9p-f9j5-w83w)
Fixed in 2.16.4, but `gatsby-parcel-config` pins the **entire** Parcel suite to
2.8.3. Overriding only the reporter to 2.16.4 makes it incompatible with the
running `@parcel/core@2.8.3` — Parcel logs *"plugin … not compatible … Requires
^2.16.4 but the current version is 2.8.3"* (non-fatal, but noisy) and the reporter
never loads. Bumping the whole 28-package Parcel suite to 2.16.4 is too risky
(packages were removed/renamed since 2.8). **Unreachable:** the flaw is in
Parcel's *dev server*, which Gatsby never runs (Parcel only bundles `gatsby-node`/
config at build; `gatsby develop` uses webpack). So **do NOT** add a
`@parcel/reporter-dev-server` override — it fixes nothing and reintroduces the
log noise. Re-check after `gatsby-parcel-config` moves to Parcel ≥2.16.4.

To close either alert without an upstream fix: `gh api --method PATCH
repos/{owner}/{repo}/dependabot/alerts/<n> -f state=dismissed -f
dismissed_reason=not_used`.
