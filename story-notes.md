# Story — Speaker Notes

**Deck:** [story.html](./story.html)

---

## Slide 1 — Title

demonstrate sidekick - our deployed agent at Tower

## Slide 2 — Overview
to start off with some context, sidekick is largest agentic use case at Distyl today..running across chat & voice serving over 200000 customer calls every day. 
- kick it off with natural language requests
- built on top of context mesh, designed specifically to empower nontechnical sme's - people have deep business context but are not ai native

## Slide 3 — The problem

today Tower's IntentCX program empowers people to build AI systems that serve thousands of  interactions every day - 

BUT the teams responsible for the QUALITY of these interactions - Care , conversation designers, product owners - couldn't change the systems they owned.

Distillery — our platform to build and evaluate those systems — were too difficult for most of them to use directly. The routine editor required heavy hand-holding, and weeks of onboarding, even for our internal strategists (who did most of the editing for these users)
    Many of these folks had never used an AI tool before, some hadn't used ChatGPT. 
    
    So the people who actually knew what a good conversation looked like — the ones with five years of customer context in their heads — had one path to improve the system: file a ticket and wait.

bottleneck: engineers knew hOW to build routines while SME's know WHAT the system should do and waht the customers actually experience it. 

 Our own strategists and engineers hit the same wall. So we built distyl-scripts — a highside repo with a shared list of repeatable workflows / skills - the foundation for sidekick's skills.

---

## Slides 4–5 — What we built / Skills + How it Works

The skills are the key part, whcich are stored in context mesh. Battle tested by our AI strategists from real workflows — the actual steps they were doing to build features, edit routines, run evals..
    stored in distyl-scripts and then published and socialized with the rest of team.
Sidekick is basically a toolkit app running on claude with an intuitive interface
    with agent-runner as our session manager
sidekick is also connected to external tools like w&b weave for traces or JIRA to retrieve tickets.

 once we got Sam onboarded. a conversation designer, with 5 years of customer context- someone who had never touched Distillery before — used those skills tco build a billing journey feature end-to-end. with No engineers. live in production

---


-
## Slide 4 — Traction

and this wasn't just one-off.

We are four weeks in since we've launched Sidekick live. we've had 2 onboarding sessions so far 
    over 800 sessions with fifty-two unique users. 
    Tower started at 5 sessions in week one and hit 25 in week four — they're now our largest cohort
    75% of all proposals in that window came through sidekick

---

## Slide 5 — What's next


biggest signal we're getting from users is that they want Sidekick embedded directly in Distillery — especially for routine editing, so they're not context-switching to a separate surface.
    Designs are in review now. 
    We're also working on persistent sessions, agent-guild for the engineering side of Tower, and subagent support.


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

How agent-runner works;
for Sidekick at Tower, there's one agent git repo in Context Mesh that contains all the Tower-specific skills (rca, fix-issue, routine-explorer, etc.). Every new session clones a fresh copy of that repo
---

## Origin (if it comes up)

Jan: AI strategists build distyl-scripts on highside — working around Distillery friction.
May: Austin and Eric move it to Context Mesh as it matures.
Late May: Rohan names it Sidekick (Tower's 00s phone).
May 28: Rachel and Eric deploy it highside. Bug bash same day.
Early June: Distyl Academy onsite. First real users (Tower interns). P0 bugs found and fixed.
June 17: Sidekick Academy — 40 non-engineering Tower stakeholders. Went down that morning, back up in time. POs doing delivery work same day.
Now: Marshall and others enthusiastic. Embedded Sidekick, persistent sessions, agent-guild in flight.
