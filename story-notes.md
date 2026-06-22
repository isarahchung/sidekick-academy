# Story — Speaker Notes

**Deck:** [story.html](./story.html)
**Audience:** Distyl engineers and internal team who don't know Tower
**Format:** ~2 min per slide, 5 min demo, 10 min Q&A

## The arc

This is a product story, not a tutorial. The through-line: Distyl built something that lets non-engineers ship AI — and it worked. Each slide earns the next one.

**The real problem underneath (know this, don't lead with it):**
Distillery had a trust and usability problem before Sidekick existed. The routine editor wasn't intuitive. There was no documentation or guidance. Engineers were juggling delivery work and platform work simultaneously with significant tech debt. One engineer put it directly: *"Distillery is currently not a platform I'm even remotely proud of."* Users at Tower lost trust due to platform unreliability and required heavy hand-holding — not because they were unsophisticated, but because the platform didn't meet them.

distyl-scripts was the team's response to that. It became a place to store tribal knowledge — the workarounds, the sequences, the things you had to know to get anything done. Sidekick surfaced that knowledge and made it self-service.

This context sharpens the story: Sidekick wasn't a nice-to-have on top of a healthy platform. It was a response to a real gap. Use it to answer "why did this need to exist?" — don't lead with it.

---

## Slide 1 — Title: Sidekick

**What to say:**
The name came from Rohan in late May. Tower's bestselling phone in the 00s was also called Sidekick — it felt right for a tool built to work alongside the people on the floor. Before that it was just called "agent-chat" in Toolkit.

Keep it short. Let the name land.

---

## Slide 2 — Context: Tower

**What to say:**
Tower is T-Mobile's production AI customer service program — one of the largest production agentic deployments in industry. Every T-Mobile customer touches it.

The team running it isn't mostly engineers. It's ~40 stakeholders across care, consumer, product, and conversation design. They're responsible for the quality of every interaction, but they had no direct way to change the system. Everything had to go through a developer.

That's the gap Sidekick closes.

**If they ask about the architecture:**
Tower runs on Distillery — the platform we've built for managing, versioning, and running AI workflows. fe-distillery is the frontend. Routines are the core primitive: structured AI workflows with steps, tool calls, and conditional logic. Sidekick wraps all of that in a natural language interface.

**If they ask why non-engineers couldn't just use Distillery directly:**
The routine editor isn't intuitive — it required significant hand-holding even for people who were technically comfortable. There was no documentation or in-product guidance. That's not on the users. Sidekick bypasses that friction entirely by letting them describe what they want in plain language.

---

## Slide 3 — What we built

**What to say:**
This didn't start as a product. In January, AI strategists on each Tower pod were hitting friction on the Distillery platform — no documentation, no guidance, a routine editor that required heavy hand-holding to use. They started building their own scripts on highside to get around it. That repo was called `distyl-scripts`. It became a place to store tribal knowledge: the sequences, the workarounds, the things you had to know to get anything done. Austin and Eric moved it to Context Mesh in May as it matured.

Those scripts became skills. AI strategists built them for themselves: editing routines, running evals, fixing defects. They worked. Then the team looked at the broader Tower team — ~40 non-technical stakeholders who were responsible for the quality of every interaction but had no path to change anything, some of whom had never used Claude or ChatGPT — and realized those same skills needed to be self-service. That's when Sidekick got a frontend.

Rachel Ombok and Eric Yu got it deployed highside on May 28. Bug bash same day.

**The proof point (land this):**
Sam, a conversation designer, built a billing journey feature end-to-end using Sidekick. No engineers involved. Shipped with zero bugs for the 118 release. That's the vision working.

---

## Slide 4 — Skills

**What to say:**
Skills weren't designed top-down. AI strategists on each pod built them for themselves first — real workflows they were running repeatedly: RCA a defect, run evals on a branch, fix a routine issue. Those became the catalog Sidekick exposes to everyone.

That lineage matters. The skills are tuned to the actual work, not a hypothetical version of it. And because they came from people who knew the platform deeply, they encode the tribal knowledge that non-technical users would otherwise have no access to — which routine to check, which eval set to run, where a data issue vs. a routine issue shows up differently.

Skills are prompt-based blueprints, not code. Structured instructions that shape how the agent sequences its tool calls for a given workflow.

---

## Slide 5 — Safe by design

**What to say:**
The biggest hesitation you hear from new users: "I'm scared to break something." Walk through the three layers:

- **Branches** — every change is isolated from production until it's ready to merge
- **Evals** — all changes are tested against regression sets before they can merge
- **Approvals** — a proposal requires a second set of eyes; you can't merge your own changes

Nothing Sidekick generates can touch production without going through all three.

**If they ask about the proposal flow technically:**
Proposals are a Distillery platform primitive — a branch diff with an approval gate. Sidekick calls Distillery's branch/proposal API endpoints (Fern-generated SDKs) to create them. The proposal lives in Distillery, not in Sidekick.

---

## Slide 6 — What's next

**What to say:**
The biggest signal from users is that they want Sidekick embedded directly in Distillery — especially for routine editing, so they don't have to context-switch to a separate surface. Designs are in review now.

Beyond that: persistent sessions (files you generate in a session shouldn't disappear), agent-guild for Tower engineers, and subagent support.

The trajectory is clear — this is getting deeper, not going away.

---

## Origin story (use in Q&A if it comes up)

- **Late May:** Rohan proposed the name "Sidekick" (Tower's 00s phone). Previously called agent-chat in Toolkit.
- **May 28:** Rachel Ombok and Eric Yu deployed it highside. Bug bash same day. Rachel cut tickets for Markdown rendering, renaming to Sidekick, and writing the runbook.
- **Early June:** Distyl Academy onsite (Seattle). First real user test with Tower interns. Found P0 bugs (user impersonation, session pod restarts, skill exposure) — most fixed before the broader rollout.
- **June 17:** Sidekick Academy — ~40 non-engineering Tower stakeholders. Sidekick went down highside that morning but the team got it back up in time. Six new users onboarded mid-week; POs were doing delivery work in Sidekick the same day.
- **Now:** Strong user enthusiasm (Marshall Ross and others at Tower). Working on stability, persistent sessions, embedded Sidekick in Distillery, and agent-guild.

---

## Likely engineer questions

- **What's it built on?** — agent-chat from Toolkit, renamed. FastAPI Python backend, React 19 + TypeScript frontend, Claude via Anthropic SDK. agent-runner manages session lifecycle and SSE event streaming. fe-distillery scans Context Mesh file stores in the agents folder to surface available agents. Sessions are sandboxed.

- **How do the connectors (Weave, Jira, Databricks) actually work?** — User-provided API keys, entered in Sidekick's config panel. The agent-runner has a proxy manager that intercepts and injects those credentials for external API calls — no credentials are stored server-side under a shared account.

- **How does Sidekick call Distillery?** — Via the same Fern-generated type-safe SDKs engineers use directly. No custom API layer. Same surface, same contracts.

- **Does Sidekick change how Distillery works?** — No. It fits into the existing refinement loop: observe → edit on branch → test → propose → merge. Sidekick automates steps in that loop; it doesn't bypass it. Proposals still require evals and an approval.

- **Is Sidekick a workaround for Distillery's UX problems?** — Partly, honestly. The routine editor has real usability issues and there's been limited documentation. Sidekick abstracts that friction. But it's also more than a workaround — it's a different model for how non-engineers interact with the system. The embedded Sidekick work (Distillery-native) is where those two things converge.

- **Does it work for voice workflows too, or just chat?** — Currently chat-focused. Tower voice (611) is a separate runtime. Voice workflow support is a natural extension but not yet scoped.

- **How is it deployed?** — Kubernetes on Azure AKS (same infra as Distillery — "Stillhouse Basil"). Highside requires Tailscale. FluxCD auto-deploys from git.

- **What's agent-guild?** — Separate product in progress for Tower engineers specifically. Sidekick targets non-engineers; agent-guild targets the dev side.

- **Can I run it locally?** — Yes via Toolkit. Standard local dev setup; Tailscale needed for Distillery connectivity.
