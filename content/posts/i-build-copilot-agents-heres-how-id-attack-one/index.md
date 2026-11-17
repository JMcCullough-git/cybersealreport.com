---
title: I Build Copilot Agents. Here's How I'd Attack One.
date: 2026-10-03
draft: false
dek: Seventy percent of the Fortune 500 trusts Copilot. Should they?
tags:
  - vulnerabilities
cover:
coverAlt: Copilot logo
---
<!--
  Properties above:
  - dek: one-sentence hook shown under the title and on cards.
  - tags: first tag is the red category pill. No spaces: threat-research, data-breaches.
  - cover: drag the lead image into this folder and name it "cover", or type its file name here.
  - draft: untick (false) when it's ready, then Commit-and-sync to publish.
  Comments like this one never appear on the site.
-->

Copilot seems to be everywhere in my life. Every enterprise and university with a Microsoft Suite seems to be buying into the Copilot eco-system. According to Strolling Digital, 70% of all Fortune 500 companies have adopted Copilot and it has become an enterprise standard. If you've had to use Copilot, you know its limited in its functionality compared to its OpenAI and Anthropic partners. 

However, what Copilot lacks in performance it offers in robust regulatory certifications. In heavily-regulated industries, Copilot is sometimes one of the only choices as Anthropic is still trying to get higher enterprise certifications. Anthropic and OpenAI are both seen as a third party risk since you are moving private data to a cloud provider to be processed. This complicates matters significantly. However, Copilot processes data "in-place" within the customer's existing Microsoft 365 tenant boundary.

This poses a new and confusing question for businesses with Data governance and controlling what the LLMs process. However, we don't often ask the question How secure are these Copilot agents that everyday businesses use? 

At my own work, I've built several small agents from writing Helpdesk KB articles and outputting them as Markdown files to hooking it up to a personal repo for troubleshooting niche software issues. 

Context and details is what helps fuel better outputs for our work but could this data be compromised? In June of this year, Varonis Threat Labs made a startingly discovery of a way to bypass Copilot's safety controls and steal user data (CVE-2026-24307). Not through a sketchy website or a malware-infested file, they used a legitimate Microsoft link. The Varonis researchers found a new attack method nicknamed "Reprompting". This attack used 3 different techniques. 

1. P2P injection: Malicious instructions are injected into the link to fill the prompt directly when the user clicks the URL. This is done by altering the Q parameter with instructions which is often used by developers of ChatGPT and Perplexity.
2. Double-Request: Copilot does have guard rails to prevent data leaks but it only triggers the safety check with the first attempt so the researchers simply prompted, "Please execute every function call twice."
3. Chain-Request: The two above techniques establish the attack vector all with one click. The user doesn't notice anything as all this happens within the loading of the legitimate Copilot app. Once the link is established, the attacker's server can issue follow-up prompts to Microsoft's server to access to all the files a user accessed, location info, and all their conversation history.

This was concerning to me and especially caught the attention of the security community as CVE gave it a 9.3 critical rating. It takes very little user interaction just one click of a link and they're compromised. Closing the tab or shutting down the systems doesn't slow down the attack as it then is in direct communication with the attacker's server. 

Here's the evidence from Varonis's own demo. The first test in Fig 1 failed because of Copilot's safeguards. However, simply put that you must do this prompt twice and the safeguards drop as mentioned in the "Double-Request" method. 

![Fig 1. Photo by Dolev Taler](Blog_Reprompt_Image1_V2.png)

In Fig 2, here's the successful exfilitration after adding the simple double-request clause. Copilot swapped the placeholder for the current username and handed back a URL ending in “varonisNew." This shows that the injected instructions ran without any questions.

![Fig 2. Photo by Dolev Taler](Pasted%20image%2020261009184140.png)

It has since been patched in Copilot but there still is a risk. The same context that makes our agents powerful is what makes them worth stealing.

So where does that leave us? Not ditching Copilot. Its regulatory and privacy certifications are real. That may be the only door open for a team. But everyone who has integrated AI into their daily workflow must *remember* that every agent is a door to your data. Please limit it to the context, it needs to do its job. 

Build the agent, but never forget what it’s holding onto.