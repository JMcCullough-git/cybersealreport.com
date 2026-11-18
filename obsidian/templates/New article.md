<%*
// "New article": creates drafts/posts/<slug>/index.md and fills in the properties.
// drafts/ is gitignored, so the article stays on this device until "Publish draft" moves it to content/posts/.
// Run it from the ribbon or command palette: Templater → "Create new note from template" → New article.
let title = await tp.system.prompt("Article title");
if (!title || !title.trim()) title = "Untitled article";
title = title.trim();
const slug = title.toLowerCase()
  .replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 60) || "untitled-article";
const folder = `drafts/posts/${slug}`;
if (!app.vault.getAbstractFileByPath(folder)) {
  await app.vault.createFolder(folder); // also creates drafts/ and drafts/posts/ the first time
}
await tp.file.move(`${folder}/index`);
const safeTitle = title.replace(/"/g, '\\"');
-%>
---
title: "<% safeTitle %>"
date: <% tp.date.now("YYYY-MM-DD") %>
draft: true
dek: ""
tags:
  - investigations
cover: ""
coverAlt: ""
featured: false
hideFromHome: false
subscribersOnly: false
---
<!--
  Properties above:
  - dek: one-sentence hook shown under the title and on cards.
  - tags: first tag is the red category pill. No spaces: threat-research, data-breaches.
  - cover: drag the lead image into this folder and name it "cover", or type its file name here.
  - draft: leave ticked. When it's ready, Templater → Insert template → "Publish draft" moves it to
    content/posts/ and unticks this, then Commit-and-sync puts it live. Until then it never reaches GitHub.
  - featured: tick to pin this as the big story on the home page.
  - hideFromHome: tick to keep it off the home page (still listed under Articles).
  - subscribersOnly: tick to put the article behind a subscribe modal. Readers enter their email to open it.
  Comments like this one never appear on the site.
-->

<% tp.file.cursor() %>Open with the moment the story started. What was the question, and what looked off?

> [!quote]
> The line you want readers to remember.

## What I found

<!-- Drag screenshots into the note. Type the caption between the [ ] of the image link. -->

> [!note]
> Context, method, or a caveat.

> [!disclosure]
> Who was notified, when, and what they did.

## What it means

Close the story. What should the reader do or take away?
