# Investigations cheatsheet

How I write investigations: scans, vulnerability reports and deep dives built from report blocks. This note lives next to the investigations so it's handy, but it never appears on the site.

## Where investigations show up

| Place | Shows investigations? |
|---|---|
| **Investigations** tab | Yes, newest first, with a severity bar and tool chips |
| Home page | The newest one, as the ruled index card under the two stories |
| RSS feed | Yes: the dek and a link to the full investigation |
| Articles, Archive, tag pages | No, those stay articles-only |

Each investigation lives at `cybersealreport.com/investigations/<folder-name>/`.

## Start a new investigation

1. I press `Ctrl + N` for a blank note, then click the **<%** Templater icon → **New investigation** → type the title.
2. Templater moves the note to `drafts/investigations/<title>/index.md` and adds example blocks. `drafts/` is gitignored, so the investigation stays on this device until I publish it.
3. I fill in the properties, keep the blocks I need, and delete the rest.
4. I drag any data files (CSV) into the same folder.
5. To publish: with the note open, **<%** icon → **Publish draft**. It moves the folder (CSVs included) to `content/investigations/` and unticks `draft`. Then **Git: Commit-and-sync**.

## Properties

| Property | What it does |
|---|---|
| `title` | The headline. Any punctuation works. |
| `dek` | One or two sentences under the title, on the Investigations tab and on the home card. |
| `labels` | Pills above the title. The first is red. Free text, spaces allowed: `Home lab · Windows`. Unlike article tags, labels don't create tag pages. |
| `meta` | Short facts after the date: `3 scans · 2 hosts · uncredentialed`. |
| `date` | Publish date. The newest investigation is the one on the home page. |
| `draft` | Ticked keeps it off the site. **Publish draft** unticks it. |
| `cover` | Optional lead image, same as articles. |
| `summary` | Optional. Which CSV the severity bar on the tab and home card counts. Without it, the site uses the first CSV in the folder that has a `Severity` or `Risk` column. |

## How blocks work

A block is a code block with the block's name where the language would go. Inside, I write simple lines:

- `Label: value` sets an option (`file: findings.csv`).
- `a | b | c` is one row of fields.
- `---` starts markdown notes (cards only).
- `===` starts the next card (cards only).

~~~markdown
```stats
256 | IPs scanned
5 | Hosts up
```
~~~

Blocks show as plain code in Obsidian's editor; they turn into the designed version on the site. Regular writing, `## headings`, `> [!note]` callouts, tables, images and code blocks all work between blocks as usual.

## The blocks

### tools: what I used

~~~markdown
```tools
Nmap | 7.99
Nessus Essentials Plus
```
~~~

One tool per line: `name | version`. The version is optional. The tools also show as chips on the Investigations tab and the home card.

### stats: big number tiles

~~~markdown
```stats
256 | IPs scanned
40.48s | Scan time
```
~~~

`number | label`, one tile per line. Works for anything countable: accounts traced, days tracked, dollars moved.

### glance: the dark "at a glance" panel

~~~markdown
```glance
file: findings.csv
note: Unique findings across all three scans, both hosts.
```
~~~

- With `file:`, it counts the CSV's `Severity` (or `Risk`) column.
- Without a file, I type the rows: `Critical | 5`.
- `title:` changes the heading (default "Findings at a glance").
- On a computer it sits to the right of the paragraphs that come after it, so I put it right before the summary text. On phones it stacks above.

### host / entity / cards: cards

~~~markdown
```host
title: 10.71.2.102
badge: Critical risk
subtitle: Windows XP · VMware
OS: Microsoft Windows XP (end of support)
Services: SMB, RDP, NTP
findings: findings.csv
ports: ports.csv
---
Notes in markdown at the bottom of the card.
===
title: 10.71.2.104
badge: Low risk
```
~~~

- `host`, `entity` and `cards` are the same block; I pick the name that reads best (`entity` for a person, handle, domain or wallet).
- `title:` big name on the card. `badge:` pill on the right, colored when it says Critical, High, Medium, Low or Info. `subtitle:` small grey line.
- Any other `Label: value` line becomes a detail row (OS, Hostname, Services, First seen, Registrar…), in the order I write them.
- `findings: file.csv` adds a severity bar and counts from rows whose `Host` column matches the title. With no subtitle, it writes one ("5 critical · 3 high").
- `ports: file.csv` adds a table of rows whose `Host` column matches the title.
- `counts: 5 critical, 3 high, 2 info` types the counts instead of using a file.
- `chip: B` puts a small dark letter box before the title.
- `===` between cards puts them side by side in a grid. One card alone runs full width.

### table: any CSV as a table

~~~markdown
```table
file: hosts.csv
columns: IP, Role, Risk
where: Risk = High
```
~~~

- `columns:` and `where:` are optional.
- Columns named Severity, Risk, Rating, Confidence or Status get colored pills.
- Columns named IP, Host, Port, Hash, SHA256, MD5, CVE, MAC, Domain, URL, Wallet, Address, Indicator or IOC use the monospace font.
- Markdown works in cells (`code`, **bold**, links).

### findings: the interactive findings table

~~~markdown
```findings
file: findings.csv
columns: CVSS, VPR, EPSS
details: What it means, Fix, Nessus name, Plugin ID
hide: Info
scans: B = Basic Network Scan, W = Win7 & XP scan, T = Windows Targeted
```
~~~

- Readers get a search box, host and scan switches, severity and tag filters, and a **+** on each row that opens the `details:` columns.
- Columns it recognizes in the CSV: `Severity` (or `Risk`), `Finding` (or `Name`, `Title`), `Host` (or `IP`), `Tags` (separated by `;`), `Found by` (letters from `scans:`, like `BWT`).
- `columns:` extra columns after Host. `hide:` severities hidden until a reader picks them.
- Rows are sorted most severe first, keeping my file's order within each level.

**Without a file** it's a short findings list:

~~~markdown
```findings
High | Two end-of-life Windows systems are reachable on SMB and RDP.
Medium | VNC is exposed on .101.
```
~~~

### priority / next-steps: numbered list

~~~markdown
```priority
MS17-010: EternalBlue | Used by WannaCry. Public exploit. | High · VPR 9.9 · 10.71.2.102
```
~~~

`title | why it matters | small grey meta`. The last two are optional; a line with just text reads as a plain sentence (good for "What I would do next").

### timeline: what happened when

~~~markdown
```timeline
Aug 14, 2026 | First forum post under the handle
Aug 20, 2026 | Domain registered with the same email
```
~~~

`date | event`. Markdown works in the event text.

### Terminal output

A normal code block with a title:

~~~markdown
```text {title="nmap · 10.71.2.101"}
5800/tcp open  vnc-http  TightVNC
```
~~~

## Data files (CSV)

- I drag CSV files into the investigation's folder, next to `index.md`. They stay private: the site shows only what the blocks render, and never publishes the files themselves.
- The first row is the column names. Any columns work; the names above just get special treatment.
- **From Nessus:** export the scan as CSV. Its columns (`Risk`, `Host`, `Name`, `CVSS v3.0 Base Score`…) work as they are; I can rename headers in Excel to friendlier ones like `Severity` and `Finding`.
- **From Excel or Google Sheets:** File → Save as / Download → **CSV**.
- **Nmap** has no CSV export. I either type host cards by hand, or make a `ports.csv` with `Host, Port, Service, Version` columns.
- Before publishing, I check the files for anything I don't want public (MAC addresses, usernames, internal hostnames). Only the columns a block shows reach the site, but they show exactly what's in the file.
- CSV files show in Obsidian's file list (the vault is set to show all file types). Clicking one may open it outside Obsidian.

## Real investigations (no scan)

The same blocks cover non-lab work:

- `stats` for scale (accounts traced, wallets, days).
- `timeline` for the sequence of events.
- `entity` cards for people, handles, domains and wallets, with detail rows and a `badge:` like "High confidence".
- `table` with a CSV I build in Excel (indicators, transactions), using a `Confidence` column for colored pills.

## If something looks wrong

- **A red "Can't find …" box:** the file name in `file:`, `findings:` or `ports:` doesn't match a file in the folder. Names are case-sensitive.
- **A block shows as plain code on the site:** the block name is misspelled (`finding` instead of `findings`).
- **A card's table or counts are empty:** the CSV's `Host` column doesn't exactly match the card's `title:`.
- **A detail row is missing:** detail rows need `Label: value` with a space after the colon.
