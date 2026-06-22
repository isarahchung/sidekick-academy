---
name: distyl-slides-html
description: Generate Distyl-branded HTML lecture decks for Distyl Academy. Produces a single self-contained .html file per session with stacked 16:9 panes, scroll-snap navigation, and on-brand Distyl typography and color. Use when an instructor asks for slides, a deck, or session content for an Academy lecture or lab kickoff. Pairs with distyl-brand for voice and palette.
---

# Distyl Academy HTML Slides

Generate one `slides.html` file per session. Each `<section class="slide">` is one 16:9 pane. The viewer scrolls (or arrow-keys / Page Down) through panes; `F` enters fullscreen.

No frameworks. Just static HTML linking to the shared `slides.css` and `slides.js` in this skill folder.

## When to use

- Instructor asks for lecture slides, a deck, or session content
- The output destination is the `distyl-academy` repo under `day-X/<session>/slides.html`

If the request is for a one-pager, written handout, or markdown doc, **don't** use this skill — write plain markdown.

## File location

Decks live at `day-X/NN-session-name/slides.html`.

## Self-contained: inline the CSS and JS

Each deck must be a **single self-contained `.html` file** — inline the full contents of `slides.css` in a `<style>` tag and `slides.js` in a `<script>` tag. Only Google Fonts is loaded externally.

Do **not** link the skill's `slides.css` / `slides.js` with relative `../../.claude/...` paths. Those break the moment the file is opened anywhere but its repo location — most importantly, decks are shared by uploading the single file to the slate viewer (slate.distyl.tech), which has no access to the skill folder. An externally-linked deck loads with no styles there and collapses into a plain text stack.

To build one: copy the boilerplate, then paste the current contents of `slides.css` and `slides.js` (in this skill folder) into the `<style>` and `<script>` placeholders. If you later update the shared `slides.css` / `slides.js`, re-inline into any deck that needs the change.

## Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>[Session title] — Distyl Academy</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet" />
  <style>
    /* Paste the full contents of slides.css here. */
  </style>
</head>
<body>

  <!-- Slides go here. Each <section class="slide"> is one pane. -->

  <script>
    // Paste the full contents of slides.js here.
  </script>
</body>
</html>
```

## Slide types

Seven types cover ~95% of lecture content. See `reference.html` in this skill folder for fully rendered examples — open it in a browser to verify visual fidelity before generating new content.

### 1. Title slide (dark)

First slide of every deck. Session title + meta (day, time, instructors).

```html
<section class="slide">
  <div class="slide-frame dark">
    <div class="title-slide">
      <div class="eyebrow on-dark">Day 1 · Session 03</div>
      <h1 class="title">Intro to Routines</h1>
      <div class="accent"></div>
      <p class="subtitle">Distyl Academy · June 2026</p>
    </div>
  </div>
</section>
```

### 2. Section divider (dark)

Major transitions inside a lecture. Use sparingly — 2–4 per deck max.

```html
<section class="slide">
  <div class="slide-frame dark">
    <div class="section-slide">
      <div class="label">Part Two</div>
      <div class="name">Anatomy of a Routine</div>
      <div class="accent"></div>
    </div>
  </div>
</section>
```

### 3. Headline + bullets (light)

The workhorse. Eyebrow label + big headline + bulleted body. ≤4 bullets.

```html
<section class="slide">
  <div class="slide-frame light">
    <div class="eyebrow">The mental model</div>
    <h1 class="headline">A routine is a structured prompt with branches.</h1>
    <ul class="bullets">
      <li><b>Steps</b> &mdash; the routine executes steps in order, and conditionals branch the flow.</li>
      <li><b>Actions</b> &mdash; each step can call a tool, prompt the model, or set a context variable.</li>
      <li><b>Branches</b> &mdash; conditionals let one routine handle several customer intents.</li>
      <li><b>Guardrails</b> &mdash; a guardrail sits above the steps and can short-circuit any of them.</li>
    </ul>
    <div class="footer"><span class="logo">Distyl</span><span class="slide-num">03</span></div>
  </div>
</section>
```

### 4. Two-column comparison (light)

Side-by-side concepts: old vs new, manual vs agent-assisted, etc.

```html
<section class="slide">
  <div class="slide-frame light">
    <div class="eyebrow">Two modes</div>
    <h1 class="headline">Chat vs. Simulation</h1>
    <div class="two-col">
      <div class="col">
        <h3>Chat</h3>
        <p>Single conversation. You type, the routine runs, you see what happens. Best for poking at behavior.</p>
      </div>
      <div class="col">
        <h3>Simulation</h3>
        <p>Runs an eval set against a branch. Each example uses a scenario for tool stubs. Best for proving fixes hold.</p>
      </div>
    </div>
    <div class="footer"><span class="logo">Distyl</span><span class="slide-num">07</span></div>
  </div>
</section>
```

### 5. Code / example (light)

Code block on a dark inner card. Use for tool configs, JSON shapes, prompt snippets.

```html
<section class="slide">
  <div class="slide-frame light">
    <div class="eyebrow">Tool response shape</div>
    <h1 class="headline">What a tool gives the routine.</h1>
    <pre class="code"><code>{
  "claimed_this_week": false,
  "current_streak": 3,
  "weeks_claimed_this_year": 14,
  "is_first_time": false
}</code></pre>
    <div class="footer"><span class="logo">Distyl</span><span class="slide-num">12</span></div>
  </div>
</section>
```

### 6. Quote / callout (light)

Pull quote or single key takeaway. One per deck max.

```html
<section class="slide">
  <div class="slide-frame light">
    <div class="quote-slide">
      <p class="quote">If you can't write the eval, you don't know what good looks like.</p>
      <p class="attribution">— Internal Distyl wisdom</p>
    </div>
    <div class="footer"><span class="logo">Distyl</span><span class="slide-num">18</span></div>
  </div>
</section>
```

### 7. Four-column anatomy (light)

Breaks a single concept into four numbered, parallel parts. Optional dark axis bar above the cards for ordering ("stable → volatile", "outer → inner"). Use for "anatomy of X" slides; ≤4 parts.

```html
<section class="slide">
  <div class="slide-frame light">
    <div class="eyebrow">What the agent sees</div>
    <h1 class="headline">Anatomy of a routine.</h1>
    <div class="axis">
      <span class="end">◀ Stable</span>
      <span class="end">Volatile ▶</span>
    </div>
    <div class="four-col">
      <div class="card">
        <div class="card-header">
          <span class="num">01</span>
          <p class="name">Context</p>
          <p class="meta">system + triage</p>
        </div>
        <div class="card-body">Persona, capabilities, and how to route intents. Same on every interaction.</div>
      </div>
      <!-- 3 more cards -->
    </div>
    <div class="footer"><span class="logo">Distyl</span><span class="slide-num">05</span></div>
  </div>
</section>
```

## Voice (from distyl-brand)

- **Direct, earned, specific.** No oversell, no hedging.
- **Slide titles are claims, not topics.** "Routines call tools" beats "Tools in routines".
- **Trust the reader.** If a bullet says it, the heading shouldn't repeat it.
- **One idea per slide.** If a slide has two ideas, it's two slides.

### Register: dense and declarative, not punchy

Match the register of the canonical T-Mobile curriculum decks — full, specific sentences, not conversational fragments. This is a deliberate correction; earlier drafts skewed too "AI-punchy."

- **Headlines are a single substantive claim**, not a two-fragment quip. Write "Chat and Simulation run the same routine for different purposes." Not "Chat to explore. Simulation to prove."
- **Bullets lead with a bold noun label, then a full declarative sentence.** Follow the Partnership / Research / Enterprise-Ready pattern: `<b>Label</b> &mdash; complete sentence stating the fact.` Not a terse fragment.
- **No conversational asides or second person.** Cut "anything beyond talking", "you poke at behavior", "before you ship it", "go build". State the fact plainly.

## Don'ts

- No emoji.
- No gradient backgrounds, shadow boxes, or decorative graphics.
- No more than 4 bullets per slide.
- Don't restate a bullet in a sub-bullet.
- Don't use violet as a background fill — small accents only.
- Don't change colors, fonts, or layout outside the slide-type catalog. If a slide doesn't fit a type, simplify until it does.

## Deck shape

A typical 30–60 minute lecture deck is 15–25 slides:
1. Title (dark)
2. "What you'll learn" — bullets (light)
3. Concept slides — mostly bullets and two-col (light)
4. 1–2 section dividers (dark) between major parts
5. Code or diagram slides where concrete examples land hard
6. Closing slide — either a section divider with "Questions?" or a content slide with the day's takeaway

Don't pad. A 30-min session can be 10 great slides.
