# Workshop Recordings Section — Design

**Date:** 2026-07-09
**Status:** Approved

## Goal

Embed the five YouTube recordings of the GenAV workshop talks into the workshop
website as a dedicated, visually presented section — not as a list of raw links.
Alongside this, convert the site's forward-looking prose to past tense, since the
workshop took place on 1 June 2026.

## Context

The site is a static HTML5 UP "Stellar" page. Two existing features are already
data-driven and set the pattern this work follows:

- `assets/js/papers.js` — an IIFE holding a data array, rendering into an empty
  container `#paper-explorer` in `index.html`.
- `assets/js/faq.js` — same shape, rendering into `#faq-list`.

Custom CSS for both lives appended at the end of `assets/css/main.css`, *not* in
`assets/sass/`. New styles follow suit.

## The videos

Playlist: `https://www.youtube.com/playlist?list=PLHJBSI3Tm1s8`
(channel: TUM Autonomous Vehicle Systems Lab)

Listed below in **program order**, which differs from playlist order.

| Video ID | Talk title (from program) | Speaker | Affiliation |
|---|---|---|---|
| `ehuemWC6Sk8` | Opening Remarks | Johannes Betz | TU Munich |
| `qaAeP8oVa80` | Generalized Autonomous Driving at Scale | Hongyang Li | University of Hong Kong |
| `_CYpRx6hlEM` | Democratizing Autonomous Driving | Kashyap Chitta | KE:SAI |
| `G3b6Y5qw-WE` | Embodied Reasoning for Out-of-Distribution Reliability in Autonomy | Milan Ganai | Stanford University |
| `yvMW2wm25Hg` | Open-Source: A Catalyst for Solving the Generalization Problem? | Felix Fent | TU Munich |

Notes:

- The YouTube title for `_CYpRx6hlEM` misspells the speaker as "Keshyap Chitta".
  The website uses the correct spelling, "Kashyap Chitta". Fixing the YouTube
  title itself is out of scope for this change.
- Cristina Olaverri-Monreal's talk was not recorded, at the speaker's request.

## Design

### 1. Data module: `assets/js/videos.js`

An IIFE mirroring `papers.js`. Holds an array of five objects:

```js
{
  id: "ehuemWC6Sk8",         // YouTube video ID
  title: "Opening Remarks",   // talk title, matching the program table
  speaker: "Johannes Betz",
  affiliation: "TU Munich",
  featured: true              // only on the opening talk
}
```

Array order is program order. The module renders into an empty
`<div id="video-grid">` and is loaded via a `<script>` tag next to the existing
`papers.js` / `faq.js` tags. It initializes on `DOMContentLoaded`, guarding for
the already-loaded case, exactly as `papers.js` does.

### 2. Click-to-play behavior

Each card initially renders a thumbnail with a play overlay, wrapped in a
`<button>` carrying an `aria-label` of the form
`Play: <title> by <speaker>`. This makes each card keyboard-operable.

On click, the script replaces the thumbnail with:

```html
<iframe src="https://www.youtube-nocookie.com/embed/<ID>?autoplay=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen title="<title> — <speaker>"></iframe>
```

Consequences: the page stays fast (no five embedded players), and YouTube sets no
cookies until a visitor actively presses play. The media area is an
`aspect-ratio: 16 / 9` container so the player scales correctly on mobile.

### 3. Self-hosted thumbnails

Thumbnails are downloaded once and committed to `images/video/<ID>.jpg`, rather
than hotlinked from `https://i.ytimg.com/vi/<ID>/hqdefault.jpg`.

Rationale: hotlinking issues a request to a Google server on page load, which
would undercut the point of using `youtube-nocookie.com`. Self-hosting means no
request reaches any Google server before the visitor clicks play. Five JPEGs at
roughly 20 KB each is a negligible cost for that property.

Source for each: `https://i.ytimg.com/vi/<ID>/hqdefault.jpg` (`hqdefault` is
always present; `maxresdefault` is not guaranteed).

### 4. Layout

A new `<section id="videos" class="main">` placed between the Program and
Accepted Papers sections, with a nav entry "Recordings" between "Program" and
"Accepted Papers".

Within the section:

- The opening talk (`featured: true`) renders as a full-width card at the top.
- The remaining four render in a 2×2 grid below it.
- On narrow viewports the grid collapses to a single column, matching the
  breakpoint behavior already used by `.paper-explorer`.

Below the grid:

- A note, styled like the existing `.paper-note`:
  *"Cristina Olaverri-Monreal's talk was not recorded, at the speaker's request."*
- A quiet link to the full YouTube playlist.

### 5. Styling

Appended to the end of `assets/css/main.css`, reusing the visual language of
`.paper-card`: white background, `solid 1px #dddddd` border, `border-radius: 8px`,
soft box-shadow. Class names follow the existing BEM-ish convention
(`.video-card`, `.video-card__media`, `.video-card__title`, …).

### 6. Tense conversion

A separate, second commit. Scope is limited to the prose that reads wrong beside
a set of recordings:

- **About section** (`index.html`): `will go beyond` → `went beyond`,
  `participants will experience` → `participants experienced`, and the
  surrounding sentences made consistent.
- **Program intro** (`index.html`): `The workshop will feature` → `featured`,
  `The workshop is happening in-person` → `took place`.
- **Header** (`index.html`): the date/location line reworded so it reads as a
  past event.

Explicitly out of scope: the program table itself, the Accepted Papers section,
and the FAQ. Several FAQ entries (poster format, in-person presentation
requirement, camera-ready instructions) are now moot, but cleaning them up is a
separate task.

## Out of scope

- Correcting the "Keshyap" misspelling in the YouTube video title.
- FAQ cleanup.
- Any change to the program table, papers list, or organizer sections.
