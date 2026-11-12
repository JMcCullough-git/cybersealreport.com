# Writing cheatsheet

How I write, format and publish posts for The Cyber Seal Report. Everything here works in Obsidian and on the site.

TEST 1 2 3 4 5

## Publishing workflow

1. **Start the article.** I press `Ctrl + N` for a blank note, then click the **<%** Templater icon in the left ribbon → **New article** → type the title. Templater moves the note to `drafts/posts/<title>/index.md` and fills in the properties. `drafts/` is gitignored, so nothing in it reaches the public repo.
   - Command palette alternative: `Ctrl + P` → "Templater: Create new note from template" → **New article**.
   - The **<%** icon needs an open note. With nothing open, Templater shows "No active editor".
2. **Fill in the properties** at the top: `dek` and `tags` (see Article properties below).
3. **Write the body** under the properties.
4. **Drag in images.** Obsidian saves them in the article's folder.
5. **Set the cover.** I rename the lead image to `cover` (right-click → Rename), or type its file name in the `cover` property.
6. **Publish.** With the article open, I click the **<%** icon → **Publish draft** (or `Ctrl + P` → "Templater: Insert template" → **Publish draft**). It moves the whole folder, images included, to `content/posts/` and unticks `draft`. Then I run **Git: Commit-and-sync** (Obsidian Git icon in the left ribbon, or `Ctrl + P` → "Git: Commit-and-sync"). The post goes live in about a minute.

**Drafts stay on one device.** Commit-and-sync skips `drafts/`, so a draft started on my PC isn't on my laptop. I finish a draft where I started it, or copy its folder over myself. I never untick `draft` and sync a note that's still in `drafts/`; it won't publish, and Publish draft is the only step that moves it.

**Fixing a published post:** I edit the note and run Commit-and-sync again.

## Article properties

| Property | What it does |
|---|---|
| `title` | The headline. Any punctuation works: `?`, `!`, `&`, `:`, quotes. The web address drops it: "Is Your Router Lying?" lives at `/posts/is-your-router-lying/`. |
| `dek` | One-sentence hook under the title and on cards. Plain text only, no formatting. |
| `tags` | The first tag is the red category pill. |
| `cover` | File name of the lead image (or I just name the image `cover`). |
| `coverAlt` | Short description of the cover image for screen readers. |
| `draft` | Ticked keeps the post off the site. **Publish draft** unticks it for me when it moves the article out of `drafts/`. |
| `featured` ☑ | Pins the post as the big lead story on the home page, however old. If several are ticked, the newest ticked one wins. |
| `hideFromHome` ☑ | Keeps the post off the home page. It still appears under Articles, tags, Archive and RSS. |

**Home page:** it shows two stories, the lead (big card) and one beside it. Without `featured`, the newest post leads. Everything else lives on the Articles page.

**Older posts without the checkboxes:** I add them in Properties (**+ Add property** → `featured`, type Checkbox) or type `featured: true`.

### Tags

Obsidian tags can't contain spaces, so I use hyphens: `threat-research` shows as **Threat Research**.

Tags in use: `investigations`, `threat-research`, `vulnerabilities`, `tooling`, `data-breaches`, `phishing-scams`, `social-engineering`, `privacy`, `OSINT`, `malware`.

## Text formatting

| I type | It shows | Obsidian shortcut |
|---|---|---|
| `**bold**` | **bold** | `Ctrl + B` |
| `*italic*` | *italic* | `Ctrl + I` |
| `<u>underline</u>` | <u>underline</u> | none |
| `==highlight==` | ==highlight== (soft red on the site) | none |
| `~~strikethrough~~` | ~~strikethrough~~ | none |
| `` `code` `` | `code` | none |
| `<kbd>Ctrl</kbd>` | <kbd>Ctrl</kbd> key caps | none |
| `H<sub>2</sub>O`, `x<sup>2</sup>` | H<sub>2</sub>O, x<sup>2</sup> | none |

- Formats combine: `**<u>bold and underlined</u>**`.
- Formatting works in the body, tables and story blocks, not in `title` or `dek`.
- I skip font colors and background colors. They clash with the design and may not show on the site.

## Story blocks

```markdown
> [!quote]
> The pull quote: big text with the red bar.

> [!note]
> Grey box for context, method, or caveats.

> [!disclosure]
> Red box for who was notified and when.

> [!note] Custom label
> Any title after the type replaces the label.
```

## Tables

```markdown
| Indicator | Type | First seen | Status |
|---|---|:---:|---:|
| `185.220.101.44` | C2 server IP | Aug 14 | **Active** |
```

- **Insert:** right-click in the note → **Insert → Table**, or type it. Obsidian's table editor adds rows and columns.
- **Alignment:** colons in the second line set it. `:---` left (default), `:---:` center, `---:` right.
- **Inside cells:** bold, highlight, `code` and links all work.
- **Wide tables** (hashes, file paths) scroll sideways on their own instead of stretching the page. I put hashes, IPs and domains in `code` so they never break mid-value.

## Code blocks

````markdown
```bash {title="check_build.sh"}
grep -r "password" /etc
```
````

The title shows in the dark bar above the code, next to a Copy button. Without `{…}`, the bar shows just the language.

## Images in articles

```markdown
![Caption shown under the image as "Fig. 1"](screenshot.png)
```

- An image on its own line becomes a numbered evidence figure, but only if it has a caption.
- File names with spaces (like Obsidian's `Pasted image …png`) are fine.
- The site publishes resized copies with **GPS and camera metadata stripped**. The original files never go online.

## Interactive charts

I drag a chart's HTML file into the article, the same way I add an image.

```markdown
![Ransomware payments by year](payments-chart.html)
```

- The text in the brackets becomes the "Fig. N" caption.
- The chart sizes itself to fit, on a computer and on a phone.
- Hover tooltips and filters work. The chart runs in a locked sandbox, so its code can't touch the rest of the site.
- Charts only work in articles. In an investigation they show a red error box.
- RSS readers can't run charts. They get a "View the interactive chart" link instead.

To force a height, I use the block version.

````markdown
```chart
file: payments-chart.html
height: 520
caption: Ransomware payments by year
```
````

**The rule that matters.** A chart must be one self-contained file. All of its code and styles live inside it. If it loads a library from another site, the sandbox blocks it and the chart shows up blank. Hugo prints a warning that names the file, so I catch it before publishing.

**The prompt I paste into Claude Design or Gemini.** I swap in my data where it says `[DATA/TOPIC]`.

```text
Create one self-contained HTML file containing a single chart of [DATA/TOPIC].
Rules:
- All CSS and JavaScript inline; no external libraries, CDNs, or images.
- Load fonts only with these @font-face rules (woff2):
  "Public Sans" 400 https://cybersealreport.com/fonts/public-sans-400.woff2
  "Public Sans" 600 https://cybersealreport.com/fonts/public-sans-600.woff2
  "JetBrains Mono" 400 https://cybersealreport.com/fonts/jetbrains-mono-400.woff2
  "JetBrains Mono" 500 https://cybersealreport.com/fonts/jetbrains-mono-500.woff2
- Fill 100% of the page width; let the height follow the chart (don't use 100vh); transparent background.
- No title or caption (my site adds those).
- Colors: text #2a2a28, axes/gridlines #e4e4e0, labels #55554f.
  Main series #d02c2b, secondary #141414, tertiary #ac1a1c, highlight fill #ffe6e2.
- Fonts: "Public Sans", sans-serif for text; "JetBrains Mono", monospace for numbers and axis labels.
- Hover tooltips with exact values; readable at 360px wide.
- Include a <table> fallback hidden visually but available to screen readers.
```

The fonts come from my own site, so the chart looks right in the Claude Design or Gemini preview too. The build allows them. Anything else from another site still gets blocked and flagged. If a chart skips the font rules, the site adds them when it publishes anyway.

## Images for emails and other uses

For images outside an article, like a logo for a Kit email: anything in the `static` folder goes live at the same path, so `static/images/my-file.png` becomes `https://cybersealreport.com/images/my-file.png`.

**The easy way (Windows File Explorer + Obsidian Git):**

1. In File Explorer, I open my vault folder and go to `static\images`.
2. I copy my image into it.
3. In Obsidian, I run **Git: Commit-and-sync**. It picks up every change in the vault, not just notes.
4. About a minute later, it's live at `https://cybersealreport.com/images/<file-name>`.

**Without my PC:** on GitHub, I open the repo → `static/images` → **Add file → Upload files**, and commit to `main`.

Rules for these files:

- **File names:** lowercase with hyphens and no spaces (`seal-banner-2026.png`). The file name becomes the web address.
- **Photos:** these files go online exactly as they are, so I strip location data first. Right-click the file → Properties → Details → **Remove Properties and Personal Information**. Graphics I made myself are fine.
- **Replacing an image:** saving over an existing name updates it everywhere, including emails already sent. I use a new name when old emails should keep the old image.

## Notes to myself

```markdown
<!-- Notes like this never appear on the site or in the RSS feed. -->
```
