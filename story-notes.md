# Story — Speaker Notes

**Deck:** [story.html](./story.html)
**Audience:** Distyl engineers who don't know Tower
**Format:** Slides · demo · 10-min Q&A

---

## Slide 1 — Title

*Sidekick open in another window, ready.*

"This is Sidekick. Our deployed agent at Tower. Let me show you what it does and how we got here."

---

## Slide 2 — What is Sidekick?

"To start off with some context — Sidekick is the largest agentic use case at Distyl today. Running across chat and voice, serving over 200,000 customer calls every day.

You interact with it through natural language requests. It's built on top of Context Mesh, and it's designed specifically to empower non-technical SMEs — people who have deep business context but are not AI-native."

---

## Slide 3 — But why?

"Tower's IntentCX program empowers people to build AI systems that serve thousands of interactions every day. But the teams responsible for the quality of those interactions — care, conversation designers, product owners — couldn't change the systems they owned.

Distillery, our platform to build and evaluate those systems, was too difficult for most of them to use directly. The routine editor required heavy hand-holding and weeks of onboarding, even for our internal strategists who were doing most of the editing for these users. Many of these folks had never used an AI tool before. Some hadn't used ChatGPT.

So the people who actually knew what a good conversation looked like — the ones with five years of customer context in their heads — had one path to improve the system: file a ticket and wait.

Here's the bottleneck: engineers knew HOW to build routines, while SMEs know WHAT the system should do and what customers actually experience. The quality of the AI was being bottlenecked by access.

Our own strategists and engineers hit the same wall. So we built distyl-scripts — a repo in T-Mobile's secure environment with a shared list of repeatable workflows and skills. That became the foundation for Sidekick's skills."

---

## Slides 4–5 — What we built + Skills + How it works

"The skills are the key part — stored in Context Mesh, battle-tested from real workflows. The actual steps our team was running every day to build features, edit routines, run evals. Stored in distyl-scripts and then published and socialized with the rest of the team.

Sidekick itself is a Toolkit app running on Claude, with agent-runner as the session manager. It's also connected to external tools — W&B Weave for traces, Jira to pull tickets.

And then we got Sam onboarded. A conversation designer with five years of customer context. Someone who had never touched Distillery before. She used those skills to build a billing journey feature end-to-end. No engineers. Live in production.

That's what it looks like when the right people finally have a direct path into the system."

---

## Slide 6 — Traction

"And this wasn't a one-off.

We're four weeks in since we launched Sidekick live. Two onboarding sessions. Over 800 sessions, 52 unique users. Tower started at five sessions in week one and hit twenty-five in week four — they're now our largest cohort. 75% of all proposals in that window came through Sidekick."

---

## Slide 7 — Guardrails

*Bridge: "Now — with this many non-engineers making changes, the natural question is how we keep it safe."*

"The guardrails aren't something we added because of Sidekick — they're built into Distillery by default.

Every change happens on a branch, never directly on what's live. Every change is versioned, so anything that slips through can be rolled back. Before anything merges, evals run — automated tests that check the agent still behaves the way it should. And Sidekick can't merge its own proposals. It creates them, and a human has to review the diff and approve it.

The process is: user request, proposal, evals pass, human approves, then merge.

The agent can suggest and build — but it can't ship on its own. That gate stays with people."

---

## Slide 8 — Sidekick Demo

*Play the recording or switch to live Sidekick.*

"Let me show you what this looks like in practice."

---

## Slide 9 — What's next

"The biggest signal we're getting from users is that they want Sidekick embedded directly inside Distillery — so they're not context-switching to a separate surface. Designs are in review now.

Beyond that: persistent sessions, agent-guild for the engineering side of Tower, and subagent support.

The trajectory is clear. The next step is bringing Sidekick inside Distillery itself."

---

## Live Demo script (5 minutes)

**Setup:** Sidekick open, API keys pre-entered (Weave + Jira), defect ticket ID ready.

**(0:00–0:45)** "Can you look at this defect and tell me what happened?" Paste ticket. *"It's calling the Jira API under my credentials. I just described what I wanted."*

**(0:45–1:30)** "Double-check by looking at the Weave trace." *"Same API you'd call manually. Sidekick is sequencing the tool calls."*

**(1:30–3:00)** "Go ahead and fix this in [routine]." *"Same Fern-generated SDK endpoints engineers use directly."*

**(3:00–4:00)** "Create a proposal." Show diff + approval gate in Distillery. *"Sidekick can't merge its own changes. A human approves."*

**(4:00–5:00)** Stop. *"Sam did exactly this. Conversation designer. Zero bugs. Live in production."*

**Fallback:** If Distillery CLI flakes, stop after RCA and show a pre-run session.

---

## Q&A

**"Just a wrapper on Claude — what's custom?"**
Skills come from real workflows our team actually ran. At session start, Sidekick has a list of skills with descriptions. You put in your request, Claude matches it to the right one. That's the routing.

**"What stops bad skills from shipping?"**
Same thing that stops bad code — review. Skills are markdown files in a git repo. Code review before they're published.

**"Why mitmproxy — that's a man-in-the-middle tool?"**
So any tool works out of the box, one config line, no custom code per service. Your credentials, injected per session, never stored server-side. The real guardrail is Distillery — the agent can't merge without a human approving the diff.

**"Why not MCP?"**
We would have had to write custom code per service. The proxy means any HTTP service with a bearer token just works.

**"How do you prevent a bad change reaching production?"**
Branch, evals, approval — in that order. Sidekick can't merge its own proposals. A human always reviews it first.

**"What's it built on?"**
agent-chat from Toolkit, renamed. FastAPI + Claude via Anthropic SDK. agent-runner manages sessions, Context Mesh stores skills. Sandboxed.

**"Why not MCP for connectors?"**
Would require writing a tool definition per service. Proxy = any HTTP service, one config line.

**"Does it work for voice?"**
Not yet. Natural extension, not scoped.

**"What's agent-guild?"**
For Tower engineers specifically. Sidekick is non-engineers; agent-guild is the dev-facing side.

---

## A2 — What's architecturally interesting

**No shared credentials.** mitmproxy injects per-PID, enforced by the kernel. Nothing server-side.

**Skills are just a git repo.** Markdown files in Context Mesh. Same review process as code.

**Model is swappable.** agent-runner abstracts Claude SDK vs OpenCode. Not coupled to Claude.

**Ephemeral sandbox → durable output.** Session is disposable. Proposal lands in Distillery with an approval gate.

*"A fresh sandbox per conversation, but every output goes through the same review process as code."*

---

## Origin (A1)

Jan: Code agents team builds distyl-scripts on highside.
May: Austin + Eric move to Context Mesh. Rohan names it Sidekick.
May 28: Rachel + Eric deploy highside. Bug bash same day.
Early June: Distyl Academy, Seattle. ~20 Tower interns. P0s found and fixed.
June 17: Sidekick Academy. 40 non-engineering stakeholders. Went down that morning, back up in time.
Now: Marshall + Tower enthusiastic. Embedded Sidekick in design review. agent-guild in flight.
