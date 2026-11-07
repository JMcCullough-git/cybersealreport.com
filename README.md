```
\_                                                                        _/
  \@@@\__                                                          __/@@@/
    `-\@@@@@\__                                              __/@@@@@/-'
        `-\@@@@@@@\__                                  __/@@@@@@@/-'
            `-\@@@@@@@@@\__                      __/@@@@@@@@@/-'
                `-\@@@@@@@@@@@\              /@@@@@@@@@@@/-'
                 __/@@@@@@@@/-'              `-\@@@@@@@@\__
             __/@@@@@@@@@@@\__                __/@@@@@@@@@@@\__
                `-\@@@@@@@@@@@@\__        __/@@@@@@@@@@@@/-'
                    `-\@@@@@@@@@@@@\__ __/@@@@@@@@@@@@/-'
                        `-\@@@@@@@@@@@@@@@@@@@@@@/-'
                            ./@@@@@@@@@@@@@@@@\.
                        .-/@@@@@@@@@/--\@@@@@@@@@\-.
                    .-/@@@@@@@@/-'        `-\@@@@@@@@\-.
                .-/@@@@@@@/-'                  `-\@@@@@@@\-.
            .-/@@@@@@/-'                            `-\@@@@@@\-.
        .-/@@@@/-'                                        `-\@@@@\-.
    .-/@@@/-'                                                  `-\@@@\-.
 .-/@@/-'                                                          `-\@@\-.
```

# The Cyber Seal Report

Every security story has a part nobody explains.

I'm Jack McCullough. I write [The Cyber Seal Report](https://cybersealreport.com). I dig into cybersecurity stories, follow the evidence, and explain what I find in plain English. Every article is human-written, not AI-generated.

This repo is the whole site. The articles, the design, the build, and the security settings all live here in the open.

## What's on the site

- **Articles.** Stories and analysis, published every other Tuesday.
- **Investigations.** Scans and vulnerability reports from my own lab, with the data behind them.
- **Newsletter.** New research by email. Sign up at [cybersealreport.com](https://cybersealreport.com).
- **RSS.** Every article and investigation at [/index.xml](https://cybersealreport.com/index.xml).

## How it's built

The site is static. There's no server, no database, and no login to attack.

| Piece | What I use |
|---|---|
| Site generator | [Hugo](https://gohugo.io) extended, 0.146 or newer |
| Hosting | Cloudflare Workers static assets |
| Deploys | Every push to `main` builds and publishes in about a minute |
| Writing | [Obsidian](https://obsidian.md). The repo doubles as my vault. |
| Newsletter | Kit |
| Analytics | Cloudflare Web Analytics. No cookies. Off until a token is set. |

## Security choices

I write about security. The site should hold up to the same scrutiny.

- **Strict Content Security Policy.** Scripts, styles, fonts, and images only load from this site. The one exception is Cloudflare's cookieless analytics script. The rules live in `static/_headers`.
- **No inline scripts or styles.** Charts, filters, and severity bars use classes and SVG. Nothing needs the CSP loosened.
- **Image metadata stripped.** I drop original photos into a post. The site only publishes resized WebP copies with GPS and camera data removed. The originals never go online.
- **Investigation data stays private.** CSV files behind an investigation never get published. The page only shows what the report blocks render.
- **Drafts never reach GitHub.** This repo is public. Unfinished posts live in `drafts/`, which Git ignores.
- **Pinned deploy tooling.** Wrangler is locked to an exact version in `package.json` and `package-lock.json`. Dependabot opens a PR when a new version ships. I read the release notes before I merge.
- **No personal email in commits.** Every commit uses my GitHub no-reply address.

Found a problem? Email me at jack@cybersealreport.com.

## Run it locally

You need Hugo extended, version 0.146 or newer.

```bash
git clone https://github.com/JMcCullough-git/cybersealreport.com.git
cd cybersealreport.com
hugo server
```

Open http://localhost:1313. Node isn't needed to preview the site. Cloudflare's build installs it for deploys only.

## How I publish

1. **New draft.** In Obsidian, the **New article** or **New investigation** template creates a note in `drafts/`.
2. **Write.** I fill in the properties, write the story, and drag in screenshots. A caption under an image becomes a numbered "Fig. N".
3. **Publish.** The **Publish draft** template moves the folder into `content/`.
4. **Sync.** Obsidian Git commits and pushes. Cloudflare builds and goes live.

The full syntax lives in two cheatsheets. One covers articles. The other covers investigations.

- `obsidian/Writing cheatsheet.md`
- `content/investigations/Investigations cheatsheet.md`

## Repo map

| Path | What's in it |
|---|---|
| `content/posts/` | Published articles, one folder each |
| `content/investigations/` | Published investigations and their data files |
| `layouts/` | Hugo templates, render hooks, and report blocks |
| `assets/css/main.css` | The whole stylesheet |
| `static/` | Fonts, icons, scripts, and security headers |
| `obsidian/` | Writing templates and the article cheatsheet |
| `hugo.toml` | Site settings, menus, and newsletter config |
| `wrangler.jsonc` | Tells Cloudflare to serve the `public/` folder Hugo builds |

## Cloudflare build settings

These live under **Workers & Pages > cyberseal > Settings > Build**.

| Setting | Value |
|---|---|
| Build command | `npm ci && hugo --minify` |
| Deploy command | `npx --no-install wrangler deploy` |
| Build variable | `HUGO_VERSION` = `0.167.0` |

Set `HUGO_VERSION` under the **Build** variables. The Worker's runtime variables won't work. Without it, Cloudflare falls back to an older default Hugo.

## Credits

The fonts are Bricolage Grotesque, Public Sans, and JetBrains Mono. All three are self-hosted under the SIL Open Font License.

Read the stories at [cybersealreport.com](https://cybersealreport.com). The code is here if you want to see how it works.
