# Story — Speaker Notes

**Deck:** [story.html](./story.html)
**Audience:** Distyl engineers who don't know Tower
**Format:** ~2 min per slide · 5 min demo · 10 min Q&A

## The arc

Distyl built something that lets non-engineers ship AI — and it worked. Each slide earns the next one.

**Know this, don't lead with it:** Distillery had a real trust and usability problem. The routine editor wasn't intuitive, no documentation existed, engineers were drowning in delivery + platform work. One put it directly: *"Distillery is currently not a platform I'm even remotely proud of."* distyl-scripts was the team's response — a place to store tribal knowledge. Sidekick surfaced that knowledge and made it self-service. Use this to answer "why did this need to exist?" not as an opener.

---

## Slide 1 — Title

Named after Tower's bestselling phone from the 00s — Rohan proposed it in late May. Before that it was agent-chat in Toolkit. Keep it short.

## Slide 2 — Context: Tower

Tower is the agentic platform operating in production across chat and voice at T-Mobile. ~40 non-engineering stakeholders — care, consumer, product, conversation design — are responsible for the quality of every interaction but had no direct path to change the system. Everything went through a dev.

**If they ask why non-engineers couldn't just use Distillery:** The routine editor required heavy hand-holding even for technical people. No documentation. That's not on the users.

## Slide 3 — What we built

In January, AI strategists were hitting friction on Distillery and started building scripts on highside to work around it — `distyl-scripts`. It became a tribal knowledge store: the sequences and workarounds you had to know to get anything done. Austin and Eric moved it to Context Mesh in May. Those scripts became skills, built by strategists for themselves. When they realized non-technical Tower users — some who'd never used Claude — needed the same access, they built a frontend. That's Sidekick.

Rachel and Eric got it deployed highside May 28. Bug bash same day.

**Land this:** Sam, a conversation designer, built a billing journey feature end-to-end with Sidekick. No engineers. Zero bugs. Live in 118.

## Slide 4 — Skills

Skills came from the strategists, not from product design. They encode the tribal knowledge — which routine to check, which eval set matters, where a data issue looks different from a routine issue. That's why they're actually useful.

## Slide 5 — Safe by design

The hesitation you always hear: "I'm scared to break something." Three layers: branches (nothing touches main until it's ready), evals (regression testing before merge), approvals (can't merge your own changes). Sidekick can't bypass any of them.

**Technical follow-up:** Proposals are a Distillery primitive — branch diff with an approval gate. Sidekick calls the same Fern-generated SDK endpoints engineers use directly.

## Slide 6 — What's next

Users want Sidekick embedded in Distillery — especially for routine editing. Designs in review now. Also: persistent sessions, agent-guild for Tower engineers, subagent support.

## Slide 7 — Demo

Hand off here. See `story-notes.md` demo section or run from Sidekick directly.

---

## Origin timeline (Q&A)

- **Jan:** distyl-scripts on highside — AI strategists working around Distillery friction
- **May:** Austin + Eric move it to Context Mesh. Rohan names it Sidekick.
- **May 28:** Rachel + Eric deploy highside. Bug bash same day.
- **Early June:** Distyl Academy onsite. First real users (Tower interns). P0s found — user impersonation, pod restarts, skill exposure.
- **June 17:** Sidekick Academy, ~40 non-engineering stakeholders. Went down that morning, back up in time. POs doing delivery work same day.
- **Now:** Marshall and others enthusiastic. Embedded Sidekick, persistent sessions, agent-guild in flight.

---

## Metrics (W22–W25, May 25–Jun 21)

**Headline numbers:** 590 sessions · 52 unique users · 17 Tower users · 55% overall success (LLM-reviewed)

**Tower growth:** 5 → 14 → 24 → 25 sessions/week. Now the largest cohort. 15 proposals submitted in 4 weeks.

**Honest picture:** Tower success rate is 49%, with 88% of sessions hitting environmental friction. That friction is mostly Distillery CLI/API failures and Weave 502s — infra reliability, not model quality. The hard workflows (rca, fix-issue, reproduce-issue) drive the most mistakes because they're also the most-used. That's where the reliability investment goes next.

**Retention:** Team 86%, Interns 69%, Tower W24 joiners 50%. Newer Tower cohorts stick less — the onboarding nudge work matters.

**If they ask how you measure success:** LLM reviewer (Claude Sonnet) reads transcripts and scores whether the user accomplished their goal. Directional, not ground truth.

## Engineer Q&A

- **Built on?** — agent-chat from Toolkit. FastAPI + Claude via Anthropic SDK. agent-runner handles session lifecycle and SSE streaming. fe-distillery scans Context Mesh file stores (agents folder) to surface available agents. Sessions are sandboxed.
- **How do connectors work?** — User-provided API keys. agent-runner's proxy manager intercepts and injects credentials per call. Nothing stored server-side.
- **How does it call Distillery?** — Same Fern-generated SDKs engineers use. No custom layer.
- **Does it change how Distillery works?** — No. Same refinement loop: observe → edit → test → propose → merge. Sidekick automates steps, doesn't bypass them.
- **Is it a workaround for Distillery's UX problems?** — Partly, honestly. But it's also a different model for non-engineer access. Embedded Sidekick is where the two converge.
- **Voice workflows?** — Not yet. Tower voice (611) is a separate runtime. Natural extension, not yet scoped.
- **Deployed how?** — Kubernetes on Azure AKS (Stillhouse Basil), same as Distillery. Highside requires Tailscale.
- **agent-guild?** — Separate product for Tower engineers. Sidekick is for non-engineers.
- **Run locally?** — Yes via Toolkit. Need Tailscale for Distillery.
