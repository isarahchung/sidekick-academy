# Story — Speaker Notes

**Deck:** [story.html](./story.html)

---

## Slide 1 — Title

Demonstrate Sidekick — our deployed agent at Tower.

---

## Slide 2 — Overview

*Say this:*

"This is the largest agentic use case at Distyl today. You interact entirely through natural language requests — built on top of Context Mesh — for non-technical SMEs who have valuable business context but are not AI-native.

The key thing to understand about why this matters: the people who know what a good conversation looks like are finally the same people who can change it. Think about what Figma did for design — it moved creative control closer to the people with the taste. Sidekick does the same thing for AI systems."

---

## Slide 3 — The problem

*Say this:*

"Tower's IntentCX program enables people to build AI systems that serve over 200,000 interactions every day, using our Distillery platform.

However, for our teams across Tower — care, conversation designers, product owners — non-technical SMEs who are not AI-native — Distillery was too difficult to use directly. The routine editor required heavy hand-holding, and weeks of onboarding, even for our internal strategists. Many of these folks had never used an AI tool before, some hadn't used ChatGPT. So the people who actually knew what a good conversation looked like — the ones with five years of customer context in their heads — had one path to improve the system: file a ticket and wait.

And it wasn't just them. Our own AI strategists hit the same wall. So they built distyl-scripts — a repo on highside where they created repeatable workflows that the platform didn't surface. That's the thing that eventually became Sidekick's skills."

---

## Slides 4–5 — What we built + Skills + How it works

*Say this:*

"The skills are the key part — stored in Context Mesh, battle-tested by our AI strategists from real workflows. The actual steps they were doing to build features or edit routines, stored in distyl-scripts and then published and shared.

Sidekick is a Toolkit app running on Claude with an intuitive interface, but with agent-runner as the session manager. It's also connected to external tools — W&B Weave for traces, Jira to retrieve tickets.

Once we got Sam onboarded — a conversation designer with five years of customer context, someone who had never touched Distillery before — she used those skills to build a billing journey feature end-to-end. No engineers. That's what it looks like when domain expertise finally has a direct path into production."

**The non-technical user point (land this explicitly):**
The quality of the AI system has always been bottlenecked by who can access it. If only engineers make changes, you get technically correct but experientially wrong AI. Sidekick unlocks the expertise that was always there but couldn't get in. That's why this matters — not just as a productivity tool, but as a quality unlock.

---

## Slide 6 — Traction

*Say this:*

"And this wasn't a one-off. Here's where we are four weeks in since we launched Sidekick live. We've had two onboarding sessions so far — over 800 sessions with 52 unique users. Tower started at five sessions in week one and hit twenty-five in week four. They're now our largest cohort, ahead of our own team and the intern class."

---

## Slide 7 — What's next

*Say this:*

"The biggest signal we're getting from users is that they want Sidekick embedded directly in Distillery — so they're not context-switching to a separate surface. We're also working on persistent sessions, agent-guild for the engineering side of Tower, and subagent support.

The trajectory is clear. This is getting deeper, not going away."

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

**Fallback:** If Distillery CLI flakes (88% of Tower sessions hit infra friction), stop after the RCA step and show a pre-run session. Don't push through a broken demo.

---

## Q&A — what they'll ask

**What's it built on?**
agent-chat from Toolkit, renamed. FastAPI Python backend, React 19 frontend, Claude via Anthropic SDK. agent-runner handles session lifecycle and SSE streaming. fe-distillery scans Context Mesh file stores in the agents folder to surface available agents. Sessions are sandboxed.

**How does agent-runner work?**
For Sidekick at Tower, there's one agent git repo in Context Mesh that contains all the Tower-specific skills (rca, fix-issue, routine-explorer, etc.). Every new session clones a fresh copy of that repo into a sandbox. agent-runner spins up the sandbox, loads the skills, registers credentials, and streams events back to the browser.

**How do the connectors work?**
User-provided API keys entered in Sidekick's config panel. agent-runner has a proxy manager (mitmproxy) that intercepts outgoing HTTP calls and injects those credentials per call. Nothing stored server-side. Your credentials, your account.

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

**Why does it matter that non-technical users can use it?**
The quality of an AI system is bottlenecked by who can access it. If only engineers make changes, you get technically correct but experientially wrong AI. Conversation designers know what a good conversation sounds like. Care leads know where customers get stuck. That domain knowledge can now go directly into the system without a developer in between.

**Does it work for voice?**
Not yet. Tower voice (611) is a separate runtime. Natural extension, not yet scoped.

**What's agent-guild?**
Separate product in progress for Tower engineers. Sidekick targets non-engineers; agent-guild is the dev-facing side.

**Can I run it locally?**
Yes via Toolkit. Standard local dev setup. Need Tailscale for Distillery.

---

## Q&A — what's interesting about the setup (for engineers)

**No shared credentials.** Every session uses the user's own API keys, injected via mitmproxy. Sidekick never holds a shared Jira/Weave/Databricks account. Architecturally clean.

**Skills are just a git repo.** No plugin system, no database of workflows. Skills are markdown files in a git repo in Context Mesh. Adding a skill = writing a file and pushing. Version control, branching, code review — all the patterns engineers already know.

**The model is swappable.** agent-runner abstracts the runtime (Claude SDK or OpenCode). The skills, the credential proxy, the sandbox — none of it is coupled to Claude.

**The sandbox is ephemeral but the work isn't.** Each session gets a fresh environment. But the proposals land in Distillery — version-controlled, with an approval gate. The disposable session produces durable output.

One-liner: *"A fresh sandbox per conversation, but every output goes through the same review process as code."*

---

## Origin (if it comes up)

Jan: AI strategists build distyl-scripts on highside — working around Distillery friction.
May: Austin and Eric move it to Context Mesh as it matures.
Late May: Rohan names it Sidekick (Tower's 00s phone).
May 28: Rachel and Eric deploy it highside. Bug bash same day.
Early June: Distyl Academy onsite. First real users (Tower interns). P0 bugs found and fixed.
June 17: Sidekick Academy — 40 non-engineering Tower stakeholders. Went down that morning, back up in time. POs doing delivery work same day.
Now: Marshall and others enthusiastic. Embedded Sidekick, persistent sessions, agent-guild in flight.
