# Story — Speaker Notes

**Deck:** [story.html](./story.html)
**Audience:** Distyl engineers who don't know Tower
**Format:** 5 slides · 5-min demo · 10-min Q&A

---

## Slide 1 — Title

*Say this:*

"I want to tell you about something we built called Sidekick. It started as a workaround. It became a product. And it proved something we've been trying to prove for a while — that the people who know what good looks like can now directly change what's in production."

*Pause. Move on.*

---

## Slide 3 — The problem

*Say this:*

"Tower's IntentCX program enables people to build AI systems that serve over 200,000 interactions every day. That's the scale. Care teams, conversation designers, product owners, dev leads — they all have a stake in what those interactions look like.

Unfortunately, Distillery — our platform to build and evaluate those systems — was too difficult for most of them to use directly. The routine editor required real hand-holding. Many of these folks had never used an AI tool before, some hadn't used ChatGPT. So the people who actually knew what a good conversation looked like — the ones with five years of customer context in their heads — had one path to improve the system: file a ticket and wait.

And it wasn't just them. Our own AI strategists hit the same wall. So they built distyl-scripts — a repo on highside where they stored the sequences and tribal knowledge that the platform didn't surface. That's the thing that eventually became Sidekick's skills."

---

## Slides 4–5 — What we built + Skills

*Say this (slides 4 and 5, run them together):*

"Sidekick is a Claude session connected to Distillery, Weave, Jira, and Databricks. You describe what you want in plain language — it handles the tool calls.

The skills are the key part. These aren't hypothetical workflows someone designed from a whiteboard. They were built by our AI strategists from real work — the actual sequences they were running every day, stored in distyl-scripts and then formalized into Context Mesh. They're battle-tested. They encode the tribal knowledge of the people who knew the platform best.

And then Sam — a conversation designer, someone who had never touched Distillery before — used those skills to build a billing journey feature end-to-end. No engineers. Zero bugs. Live in the 118 release. That's what it looks like when domain expertise finally has a direct path into production."

---

## Slide 4 — Traction

*Say this:*

"Here's where we are four weeks in. Five hundred and ninety sessions, fifty-two unique users. Tower started at five sessions in week one and hit twenty-five in week four — they're now our largest cohort, ahead of our own team and the intern class.

I want to be honest about the quality picture. Tower's success rate is forty-nine percent. Eighty-eight percent of their sessions hit environmental friction. But here's what that actually means — the friction is Distillery CLI failures and Weave timeouts. It's infrastructure reliability, not model quality. That's what's driving the roadmap."

---

## Slide 5 — What's next

*Say this:*

"The biggest signal we're getting from users is that they want Sidekick embedded directly in Distillery — especially for routine editing, so they're not context-switching to a separate surface. Designs are in review now. We're also working on persistent sessions, agent-guild for the engineering side of Tower, and subagent support.

The trajectory is clear. This is getting deeper, not going away.

Let me show you what it actually looks like."

*Switch to Sidekick. Start the demo.*

---

## Demo script (5 minutes)

**Setup before presenting:**
- Sidekick open, API keys configured (Weave + Jira pre-entered)
- Real defect ticket ID ready to paste
- Know the routine name for that flow

**Run this:**

**(0:00–0:45)** Type: "Can you look at this defect and tell me what happened?" Paste the ticket ID. While it runs: "It's calling the Jira API under my credentials, pulling the ticket, reading the comments. I didn't configure a workflow — I just described what I wanted."

**(0:45–1:30)** Type: "Double-check by looking at the Weave trace." While it runs: "Same Weave API you'd call manually. Sidekick is sequencing the tool calls — it's not doing anything you couldn't do, it's just doing it for you."

**(1:30–3:00)** Type: "Go ahead and fix this in [routine name]." While it runs: "It's calling the same Fern-generated SDK endpoints engineers use directly. No custom layer between Sidekick and the platform."

**(3:00–4:00)** Type: "Create a proposal for this change." Switch to Distillery to show the proposal — red/green diff, approval gate. "Sidekick can't merge its own changes. It created the proposal. A human has to approve it."

**(4:00–5:00)** Stop. Say: "Sam did exactly this. Conversation designer. Never touched Distillery before Sidekick. Zero bugs. Live in production."

**Fallback:** If Distillery CLI flakes (it happens — 88% of Tower sessions hit infra friction), stop after the RCA step and show the proposal from a pre-run session. Don't push through a broken demo.

---

## Q&A — what they'll ask

**What's it built on?**
agent-chat from Toolkit, renamed. FastAPI Python backend, React 19 frontend, Claude via Anthropic SDK. agent-runner handles session lifecycle and SSE streaming. fe-distillery scans Context Mesh file stores in the agents folder to surface available agents. Sessions are sandboxed.

**How do the connectors work?**
User-provided API keys entered in Sidekick's config panel. agent-runner has a proxy manager that intercepts and injects those credentials per call. Nothing stored server-side under a shared account.

**How does it call Distillery?**
Same Fern-generated type-safe SDKs engineers use directly. No custom API layer. Same surface, same contracts.

**Does it change how Distillery works?**
No. Same refinement loop: observe → edit on branch → test → propose → merge. Sidekick automates steps in that loop. It doesn't bypass the approval gate.

**Is it a workaround for Distillery's UX problems?**
Partly, honestly. The routine editor has real usability issues and there's been limited documentation. Sidekick abstracts that friction. But it's also a different model — non-engineers interacting directly with the system. Embedded Sidekick is where those two things converge.

**How do skills work technically?**
Prompt-based blueprints loaded into agent context. Not code — structured instructions that shape how the agent sequences tool calls. Built by AI strategists for themselves first, which is why they're actually useful.

**What's the full skill catalog?**
Building: edit a routine, create evals, ship a feature end-to-end.
Fixing: RCA a defect, reproduce an issue, make the fix.
Monitoring: pull production logs, query Databricks, generate output visuals.
Onboarding: Distillery Coach explains any concept in plain language and routes to the right skill.

**How do you prevent bad changes from going to production?**
Branches (nothing touches main until ready), evals (regression testing required before merge), approvals (can't merge your own changes). All Distillery primitives — Sidekick didn't build its own safety layer.

**Does it work for voice?**
Not yet. Tower voice (611) is a separate runtime. Natural extension, not yet scoped.

**What's agent-guild?**
Separate product in progress for Tower engineers. Sidekick targets non-engineers; agent-guild is the dev-facing side.

**Can I run it locally?**
Yes via Toolkit. Standard local dev setup. Need Tailscale for Distillery.

---

## Origin (if it comes up)

Jan: AI strategists build distyl-scripts on highside — working around Distillery friction.
May: Austin and Eric move it to Context Mesh as it matures.
Late May: Rohan names it Sidekick (Tower's 00s phone).
May 28: Rachel and Eric deploy it highside. Bug bash same day.
Early June: Distyl Academy onsite. First real users (Tower interns). P0 bugs found and fixed.
June 17: Sidekick Academy — 40 non-engineering Tower stakeholders. Went down that morning, back up in time. POs doing delivery work same day.
Now: Marshall and others enthusiastic. Embedded Sidekick, persistent sessions, agent-guild in flight.
