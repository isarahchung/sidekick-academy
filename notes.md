# Sidekick Academy

**Date:** June 17, 2026
**Instructor(s):** Rohan Harpalani, Sarah Chung
**Audience:** IntentCX team (care, consumer, product, design, dev leads)
**Slides:** [slides.html](./slides.html)

## Goal

Attendees leave knowing what Sidekick is, how to use it for defect management and production analysis, and what the review process looks like before merging a proposal.

## Key concepts

- Sidekick is an agentic interface — natural language instead of pointing and clicking
- It's connected to Distillery, Weave, Jira, and Databricks in one place
- Skills are repeatable workflows; three categories: building, fixing, monitoring
- All changes live on branches and require evals and an approval before merging
- Review scope should match change scope — surgical changes are async, structural changes are sync

## Talking points (by slide)

1. **Title** — Sidekick was a focus of Distyl Academy with the interns; this session brings the broader IntentCX team up to speed. Some attendees may not have worked with Distillery before — frame this as both a Sidekick intro and a Distillery crash course.

2. **Agenda** — Four sections: overview, use case walkthrough, development process, Q&A.

3. **Section divider — Sidekick Overview** — Visual reset. The name is inspired by the phone, not the campus bar.

4. **An agentic interface for IntentCX** — Contrast with the current UI experience of pointing and clicking. With Sidekick you talk to Distillery in natural language, the same way you'd work with Claude or Codex. What makes it powerful: it can do the brainstorming *and* the actions. Implementation details that used to require deep platform knowledge — where in the routine to edit something, which version is active in production, how to set a conditional — get abstracted away.

5. **Connected to the tools you already use** — Distillery (all endpoints), Weave (trace inspection), Jira (ticket lookup), Databricks (production queries). Consolidating these connections enables cross-tool workflows: see something in Weave → tie it to a Jira ticket → make evals → build a proposal, all without context-switching.

6. **Skills encode repeatable workflows** — A skill is a blueprint for a sequence of steps an agent follows. Example: for a defect, the sequence might be Weave trace → test data → routine location → production frequency. Three categories already loaded in Sidekick:
   - **Building:** edit a routine, create evals, build a feature end-to-end
   - **Fixing:** RCA a defect, reproduce an issue, make a fix
   - **Monitoring:** prod analysis, pull eval results, query Databricks

   Also call out the **Distillery Coach** onboarding skill (Sarah's addition): helps anyone new to Distillery understand concepts in plain language, understand what Sidekick can and can't do (e.g., it won't merge a proposal without your explicit approval), and routes to the right skill based on intent.

7. **Section divider — Use Case Walkthrough** — Two walkthroughs: defect management and production analysis.

8. **Two walkthroughs** — See live demo section below.

9. **Section divider — Development Process** — The goal: everyone contributes based on their unique perspective. The billing chat pod already proved this out — Sam (conversation designer) built an entire feature end-to-end using Sidekick for the 118 release, no bugs, live in production. The vision: more people building, development team isn't the gate.

10. **Sidekick accelerates iteration velocity** — The barrier to making a proposal is now low enough that subject matter experts — care team, consumer team, conversation designers — can contribute directly. The AI everywhere vision scales through more builders, not just more developers.

11. **Guardrails are built into Distillery** — Address the "I'm scared to break something" hesitation directly. Four layers:
    - **Branches** — all edits live on a branch; nothing you do on a branch touches production
    - **Versioning** — any change can be rolled back to a prior version
    - **Evals** — every change is evaluated against regression test sets before it can merge
    - **Deployment stages** — main → NPE (QLab) → stage → production; merging to main doesn't mean it's live

12. **Updates must be tracked, tested, and reviewed** — Three requirements for any change:
    - Jira ticket (visibility, tracking, stakeholder loop-in)
    - Proposal with diff (shows exactly what changed; red/green highlights)
    - Evals passing + one approval from someone who isn't you

13. **Reviews should match the change's scope** — Two buckets:
    - **Surgical / self-contained** (wording tweak, conflicting instruction, behavior reinforcement): async. Run evals, send proposal to pod dev lead or PO for approval.
    - **Structural / behavioral** (new flow, changed end-user experience, tool/core functionality change): sync. Review with product + dev + conversation design in existing pod meetings (standups, eval reviews). Then send to dev lead or PO to approve.

    When in doubt, err toward transparency. Check with your design or product partner if you're unsure which bucket a change falls into. If it might be feature-level, it probably needs more people.

14. **Questions?** — Open Q&A. If no other questions: send Sidekick link in chat, offer 1:1 walkthroughs for anyone who wants hands-on time.

## Live demos

### Demo 1 — Defect management
Pre-open: Sidekick, a real defect ticket (chat), a Weave trace for that ticket.

1. Show the key icon in the Sidekick corner — attendees need to enter API keys for Weave, Jira, Databricks before those tools are available under their account.
2. Paste the defect name: "Can you take a look at this defect? Tell me what happened here."
3. Walk through what Sidekick does: pulls the Jira ticket → gets comment details → summarizes root cause, fix, verification.
4. Ask it to double-check by looking at Weave → it fetches the conversation from QLab, extracts turns, verifies the proposed fix against the trace.
5. Point: Sidekick can also identify whether a bug is a routine issue, data issue, or backend issue — that first triage step no longer requires deep platform knowledge.

### Demo 2 — Production analysis (billing journey)
Pre-open: Sidekick session, billing journey Weave project name ready to paste.

1. Prompt: "Look at production logs for billing journey and create a visual showing adoption over time since launch (launched Monday)." Specify the Weave project name.
2. Walk through what it does: validates Weave credentials → pulls traces → defines what counts as a conversation → calculates day-over-day volume → generates an HTML file.
3. Show the output file in the Sidekick file store: total conversations, peak timing, adoption graph.
4. Point: this closes the loop — what's happening in production informs what to change in development, and Sidekick can do both.

## Common questions

- **Q:** Is there a file upload in Sidekick?
  **A:** Not yet — paste content in for now. It's in progress.

- **Q:** Can I use Sidekick to check if a routine adheres to a documentation of requirements?
  **A:** Yes. Paste in the requirements and point it at the system in Distillery. It can compare and iterate.

- **Q:** Where are the slides and recording?
  **A:** Recording is available from the meeting. Slides will be sent after.

- **Q:** Should product review before I even start a change, or just before merging?
  **A:** For surgical changes, an FYI is enough — you don't need a gate. For structural changes, loop in product before starting so you're not building something that needs to be undone. When in doubt, ask.

- **Q:** Who approves a proposal?
  **A:** Your pod's dev lead or PO. They're the merge approver. For larger changes, the sync review with the broader group happens first, then they approve.

## Hand-off

This is a standalone intro session. The natural next step is hands-on time. Offer 1:1 walkthroughs — it doesn't take long and people adapt quickly. Access requests: ping Rohan directly or react to his original message in the meeting thread.
