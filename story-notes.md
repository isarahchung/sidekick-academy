# Story — Speaker Notes

**Deck:** [story.html](./story.html)
**Audience:** Distyl engineers and internal team who don't know Tower
**Format:** ~2 min per slide, 5 min demo, 10 min Q&A

## The arc

This is a product story, not a tutorial. The through-line: Distyl built something that lets non-engineers ship AI — and it worked. Each slide earns the next one.

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

---

## Slide 3 — What we built

**What to say:**
Sidekick is agent-chat from Toolkit, deployed into Tower's environment. Rachel Ombok and Eric Yu got it running highside on May 28 — that was the first real milestone. A bug bash followed the same day.

The key thing it unlocks: you can now RCA a defect, analyze production logs, or propose a routine change entirely in natural language. No need to know which routine to edit, what's active in production, or how to structure an eval.

**The proof point (land this):**
Sam, a conversation designer, built a billing journey feature end-to-end using Sidekick. No engineers involved. Shipped with zero bugs for the 118 release. That's the vision working.

---

## Slide 4 — Skills

**What to say:**
Skills are repeatable workflows — blueprints that tell the agent what to do in a given situation. Not code; structured instructions that shape how it sequences its tool calls.

Three categories cover most of what the team needs: building (edit routines, create evals, ship features), fixing (RCA, reproduce, fix), and monitoring (pull production logs, query Databricks, generate visuals). The fourth — Distillery Coach — handles onboarding for anyone new to the platform.

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

- **What's it built on?** — agent-chat from Toolkit. FastAPI backend, React 19 + TypeScript frontend, Claude via Anthropic SDK, agent-runner for session management and SSE streaming.
- **How do skills work technically?** — Prompt-based blueprints loaded into agent context. Not code — structured instructions that shape tool sequencing.
- **How does it connect to Weave/Jira/Databricks?** — User-provided API keys. Each connector calls the service under the user's credentials.
- **How is it deployed?** — Kubernetes on Azure AKS (same infra as Distillery — "Stillhouse Basil"). Highside deployment requires Tailscale.
- **What's agent-guild?** — Separate product in progress for Tower engineers. Sidekick targets non-engineers; agent-guild targets the dev side.
- **Can I run it locally?** — Yes via Toolkit. Standard local dev setup; you'll need Tailscale for Distillery connectivity.
