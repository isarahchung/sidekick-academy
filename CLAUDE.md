# Sidekick Academy

Presentation slides for Sidekick — the agentic interface for IntentCX. Single repo, one or more decks.

## Layout

- `slides.html` — the main deck (Distyl-themed, self-contained)
- `.claude/skills/distyl-slides-html/` — auto-loaded skill for generating and editing slides

## When asked to generate or edit slides

Use the `distyl-slides-html` skill. It's auto-loaded in this repo. The skill's `SKILL.md` has the full slide-type catalog, boilerplate, and voice guidelines. `reference.html` in the skill folder is the visual ground truth — open it in a browser to verify fidelity.

Don't invent new slide types or styles. If a slide doesn't fit one of the existing types, simplify until it does.

## Slide engine

Each deck is a single self-contained `.html` file — CSS and JS are inlined, no external dependencies except Google Fonts. This means any file can be opened directly from disk or shared as a standalone file.

Source files for the engine live in `.claude/skills/distyl-slides-html/slides.css` and `slides.js`. If you update the engine, re-inline into `slides.html`.

## Presenting

Open `slides.html` in a browser. Scroll or use arrow keys / Page Down to advance. `F` toggles fullscreen.

## Voice

Direct, earned, specific. Slide titles are claims, not topics. No emoji. No oversell.
