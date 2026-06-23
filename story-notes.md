# Story — Speaker Notes

**Deck:** [story.html](./story.html)

---

## Slide 1 — Title

demonstrate sidekick - our deployed agent at Tower

## Slide 2 — Overview
largest agentic use case at Distyl today..
- kick it off with natural language requests
- built on top of context mesh for nontechnical sme's who have valuable business context but are not ai native

## Slide 3 — The problem

*Say this:*

today IntentCX program at Tower enables people to build AI systems that serve over 200,000 interactions every day, using our Distillery Platform

However for our teams across tower - Care , conversation designers, product owners - non-technical SME who are not AI -native...

Distillery — our platform to build and evaluate those systems — were too difficult for most of them to use directly. The routine editor required heavy hand-holding, and weeks of onboarding, even for our internal strategists. 
    Many of these folks had never used an AI tool before, some hadn't used ChatGPT. So the people who actually knew what a good conversation looked like — the ones with five years of customer context in their heads — had one path to improve the system: file a ticket and wait.

And it wasn't just them. Our own AI strategists hit the same wall. So they built distyl-scripts — a repo on highside where they created repeatable workflows that the platform didn't surface . That's the thing that eventually became Sidekick's skills."

---

## Slides 4–5 — What we built + Skills + How it Works

The skills are the key part, whcich are stored in context mesh. Battle tested by our AI strategists from real workflows — the actual steps they were doing to build features or edit routines
    stored in distyl-scripts and then published and shared.  
sidekick is also connected to external tools  like w&b weave for traces or JIRA to retrieve tickets.

There were a lot of false starts in the beginnign but once we got Sam onboarded — a conversation designer, with 2 years of experience mapping dialogue flows - someone who had never touched Distillery before — used those skills tco build a billing journey feature end-to-end. with No engineers. which was a huge success 

---


-
## Slide 4 — Traction


"Here's where we are four weeks in since we've launched Sidekick live. we've had 2 onboarding sessions so far 
    over 800 sessions with fifty-two unique users. 
    Tower started at five sessions in week one and hit twenty-five in week four — they're now our largest cohort, ahead of our own team and the intern class.


---

## Slide 5 — What's next

*Say this:*

"The biggest signal we're getting from users is that they want Sidekick embedded directly in Distillery — especially for routine editing, so they're not context-switching to a separate surface. Designs are in review now. We're also working on persistent sessions, agent-guild for the engineering side of Tower, and subagent support.


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

---

## Q&A — what's interesting about the setup (for engineers)

**No shared credentials.** Every session uses the user's own API keys, injected at the network layer via mitmproxy. Sidekick never holds a shared Jira/Weave/Databricks account. If they ask "how do you handle auth?" — the answer is architecturally clean.

**Skills are just a git repo.** No plugin system, no database of workflows. Skills are markdown files in a git repo in Context Mesh. Adding a skill = writing a file and pushing. Version control, branching, code review — all the patterns engineers already know.

**The model is swappable.** agent-runner abstracts the runtime (Claude SDK or OpenCode). The skills, the credential proxy, the sandbox — none of it is coupled to Claude. Unusual for a production agentic system.

**The sandbox is ephemeral but the work isn't.** Each session gets a fresh environment. But the proposals it creates land in Distillery — version-controlled, with an approval gate. The disposable session produces durable output.

One-liner: *"A fresh sandbox per conversation, but every output goes through the same review process as code."*
