# Workshop Recordings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Recordings" section to the workshop website that presents the five YouTube talk recordings as click-to-play cards, and convert the site's forward-looking prose to past tense.

**Architecture:** A new `assets/js/recordings.js` IIFE holds the recording data and renders click-to-play cards into an empty `<div id="recordings-grid">` in `index.html`. Thumbnails are self-hosted under `images/recordings/`; the YouTube iframe is injected only on click, pointing at `youtube-nocookie.com`. This exactly mirrors the existing `papers.js` / `faq.js` pattern. Custom CSS is appended to the end of `assets/css/main.css`.

**Tech Stack:** Static HTML5 UP "Stellar" site. Vanilla ES5-style JavaScript in IIFEs, no build step, no package manager, no framework. Plain CSS.

**Spec:** `docs/superpowers/specs/2026-07-09-workshop-recordings-design.md`

## Global Constraints

- **Naming.** Everything user-facing and internal is named "recordings": section id `recordings`, nav label `Recordings`, heading `Recordings`, module `assets/js/recordings.js`, image directory `images/recordings/`, CSS classes `.recording-card*`. The word "video" appears **only** where it names a YouTube concept (a video ID). No `.video-card`, no `#video-grid`, no `videos.js`.
- **No test framework exists.** This repo has no `package.json`, no test runner, and neither `papers.js` nor `faq.js` has tests. Do **not** introduce a test framework — that is scope creep the user did not ask for. Each task below instead specifies concrete, runnable static checks plus an explicit browser verification with a stated expected observation. Run them; do not skip to "looks fine".
- **No third-party requests before click.** After Task 3, the page must issue zero requests to any Google-owned host on load. Thumbnails come from `images/recordings/`. The only permitted `youtube.com` reference in page-load HTML is the plain playlist hyperlink in the section footer. The `youtube-nocookie.com` iframe is created in JS at click time only.
- **Style vocabulary.** Reuse `.paper-card`'s look exactly: `background: #ffffff`, `border: solid 1px #dddddd`, `border-radius: 8px`, `box-shadow: 0 0.65em 1.8em rgba(99, 99, 99, 0.08)`.
- **CSS lives in `assets/css/main.css`, appended at the end.** It is *not* compiled from `assets/sass/`. The existing custom features (`.paper-explorer`, `.faq-list`, `.workshop-stats`) all live there. Do not edit `assets/sass/`.
- **Tabs, not spaces.** Every file in this repo indents with tabs. Match it.
- **The `escapeHtml` helper is duplicated, not shared.** `papers.js` and `faq.js` each define their own copy. `recordings.js` defines its own too. Do not create a shared utility module — that would break the established convention for a five-line function.

## The data (authoritative — copy verbatim)

Listed in **program order**, which differs from the playlist's order.

| Video ID | Title | Speaker | Affiliation |
|---|---|---|---|
| `ehuemWC6Sk8` | Opening Remarks | Johannes Betz | TU Munich |
| `qaAeP8oVa80` | Generalized Autonomous Driving at Scale | Hongyang Li | University of Hong Kong |
| `_CYpRx6hlEM` | Democratizing Autonomous Driving | Kashyap Chitta | KE:SAI |
| `G3b6Y5qw-WE` | Embodied Reasoning for Out-of-Distribution Reliability in Autonomy | Milan Ganai | Stanford University |
| `yvMW2wm25Hg` | Open-Source: A Catalyst for Solving the Generalization Problem? | Felix Fent | TU Munich |

Playlist URL: `https://www.youtube.com/playlist?list=PLHJBSI3Tm1s8`

Note: YouTube's own title for `_CYpRx6hlEM` misspells the speaker as "Keshyap Chitta". The site uses **"Kashyap Chitta"**. Do not copy the misspelling.

## File Structure

| File | Status | Responsibility |
|---|---|---|
| `images/recordings/<ID>.jpg` (×5) | Create | Self-hosted thumbnails, one per recording, named by video ID. |
| `assets/js/recordings.js` | Create | Recording data array + card rendering + click-to-play iframe injection. Nothing else. |
| `index.html` | Modify | New `<section id="recordings">`, new nav `<li>`, new `<script>` tag. Separately: tense conversion in the header, About, and Program intro. |
| `assets/css/main.css` | Modify | Append `.recordings-grid` / `.recording-card*` rules at end of file, before the existing final `@media` block's closing brace is *not* touched — append after the file's last line. |

---

### Task 1: Self-hosted thumbnails

**Files:**
- Create: `images/recordings/ehuemWC6Sk8.jpg`
- Create: `images/recordings/qaAeP8oVa80.jpg`
- Create: `images/recordings/_CYpRx6hlEM.jpg`
- Create: `images/recordings/G3b6Y5qw-WE.jpg`
- Create: `images/recordings/yvMW2wm25Hg.jpg`

**Interfaces:**
- Consumes: nothing.
- Produces: five JPEG files at `images/recordings/<ID>.jpg`. Task 2's renderer builds its `<img src>` from exactly this path pattern.

Use `hqdefault.jpg`, not `maxresdefault.jpg` — `maxresdefault` is not guaranteed to exist for every video and silently 404s.

- [ ] **Step 1: Download the five thumbnails**

```bash
mkdir -p images/recordings
for id in ehuemWC6Sk8 qaAeP8oVa80 _CYpRx6hlEM G3b6Y5qw-WE yvMW2wm25Hg; do
  curl -sS -f -o "images/recordings/${id}.jpg" \
    "https://i.ytimg.com/vi/${id}/hqdefault.jpg" \
    && echo "ok   ${id}" || echo "FAIL ${id}"
done
```

Expected: five lines, each `ok   <id>`. Any `FAIL` line means that video ID is wrong or the video is private — stop and report, do not proceed.

- [ ] **Step 2: Verify all five are real JPEGs and non-trivial in size**

```bash
file images/recordings/*.jpg
find images/recordings -name '*.jpg' -size -3k
```

Expected from `file`: five lines, each containing `JPEG image data`.
Expected from `find`: **no output**. Any file under 3 KB is YouTube's grey "video unavailable" placeholder, not a real thumbnail. If a file is listed, that video ID is wrong — stop and report.

- [ ] **Step 3: Commit**

```bash
git add images/recordings
git commit -m "Add self-hosted thumbnails for workshop recordings

Serving thumbnails locally means no request reaches a Google server
before a visitor presses play, which is the point of using
youtube-nocookie.com for the embed."
```

---

### Task 2: The `recordings.js` module

**Files:**
- Create: `assets/js/recordings.js`
- Modify: `index.html` — add `<script src="assets/js/recordings.js"></script>` after the existing `faq.js` script tag (currently the last script, near line 409).

**Interfaces:**
- Consumes: `images/recordings/<ID>.jpg` from Task 1.
- Produces:
  - A DOM contract Task 3 styles against: the module writes into `#recordings-grid` (created in Task 3) and emits, per recording, `<article class="recording-card">` (plus `recording-card--featured` on the opening talk) containing `<button class="recording-card__media">` → `<img class="recording-card__thumb">` + `<span class="recording-card__play">`, followed by `<div class="recording-card__body">` → `<h3 class="recording-card__title">` + `<p class="recording-card__speaker">`.
  - On click, the `<button class="recording-card__media">` is **replaced** by `<iframe class="recording-card__player">`. Task 3 must therefore style `.recording-card__media` and `.recording-card__player` to occupy the same box.

Note this task's deliverable renders nothing visible yet — `#recordings-grid` does not exist until Task 3. That is intentional: the module must no-op gracefully when its mount point is absent, exactly as `renderPapers()` does (`if (!target) return;`). Step 4 tests precisely that.

- [ ] **Step 1: Write `assets/js/recordings.js`**

Indent with tabs.

```js
(function () {
	"use strict";

	var PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLHJBSI3Tm1s8";

	// Program order, which differs from the order of the YouTube playlist.
	var recordings = [
		{
			id: "ehuemWC6Sk8",
			title: "Opening Remarks",
			speaker: "Johannes Betz",
			affiliation: "TU Munich",
			featured: true
		},
		{
			id: "qaAeP8oVa80",
			title: "Generalized Autonomous Driving at Scale",
			speaker: "Hongyang Li",
			affiliation: "University of Hong Kong"
		},
		{
			id: "_CYpRx6hlEM",
			title: "Democratizing Autonomous Driving",
			speaker: "Kashyap Chitta",
			affiliation: "KE:SAI"
		},
		{
			id: "G3b6Y5qw-WE",
			title: "Embodied Reasoning for Out-of-Distribution Reliability in Autonomy",
			speaker: "Milan Ganai",
			affiliation: "Stanford University"
		},
		{
			id: "yvMW2wm25Hg",
			title: "Open-Source: A Catalyst for Solving the Generalization Problem?",
			speaker: "Felix Fent",
			affiliation: "TU Munich"
		}
	];

	function escapeHtml(value) {
		return String(value).replace(/[&<>"']/g, function (character) {
			return {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"\"": "&quot;",
				"'": "&#039;"
			}[character];
		});
	}

	function renderRecordings() {
		var target = document.getElementById("recordings-grid");

		if (!target) return;

		target.innerHTML = recordings.map(function (recording) {
			var modifier = recording.featured ? " recording-card--featured" : "";
			var caption = recording.title + " — " + recording.speaker;

			return [
				'<article class="recording-card' + modifier + '">',
					'<button class="recording-card__media" type="button"',
						' data-recording-id="' + escapeHtml(recording.id) + '"',
						' data-recording-caption="' + escapeHtml(caption) + '"',
						' aria-label="' + escapeHtml("Play: " + caption) + '">',
						'<img class="recording-card__thumb" src="images/recordings/' + escapeHtml(recording.id) + '.jpg" alt="" loading="lazy" />',
						'<span class="recording-card__play" aria-hidden="true"></span>',
					'</button>',
					'<div class="recording-card__body">',
						'<h3 class="recording-card__title">' + escapeHtml(recording.title) + '</h3>',
						'<p class="recording-card__speaker">' + escapeHtml(recording.speaker) + ' &middot; ' + escapeHtml(recording.affiliation) + '</p>',
					'</div>',
				'</article>'
			].join("");
		}).join("");
	}

	function playRecording(button) {
		var recordingId = button.getAttribute("data-recording-id");
		var caption = button.getAttribute("data-recording-caption");
		var frame = document.createElement("iframe");

		frame.className = "recording-card__player";
		frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(recordingId) + "?autoplay=1&rel=0";
		frame.title = caption;
		frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
		frame.setAttribute("allowfullscreen", "");
		frame.setAttribute("frameborder", "0");

		button.parentNode.replaceChild(frame, button);
		frame.focus();
	}

	function initRecordings() {
		var target = document.getElementById("recordings-grid");

		if (!target) return;

		renderRecordings();

		target.addEventListener("click", function (event) {
			var button = event.target.closest(".recording-card__media");

			if (!button) return;

			playRecording(button);
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initRecordings);
	} else {
		initRecordings();
	}
})();
```

`PLAYLIST_URL` is declared but not read by the module — the playlist link is static markup in Task 3. Keep it as the single documented source of the playlist URL; Task 3's `index.html` link must match it exactly. If a linter later complains about it being unused, that is acceptable; this repo has no linter.

Why `parentNode.replaceChild` rather than `button.replaceWith(frame)`: the rest of this codebase is written in ES5-flavoured JS with no transpiler, and `replaceWith` has no polyfill here. `frame.focus()` moves keyboard focus onto the player, so a keyboard user who pressed Enter on the card is not dumped back to the top of the document when the button they were focused on disappears.

- [ ] **Step 2: Verify the file parses**

```bash
node --check assets/js/recordings.js
```

Expected: no output, exit code 0. (Confirm with `echo $?` → `0`.)

- [ ] **Step 3: Verify the data is correct and no thumbnail is hotlinked**

```bash
echo "--- the five IDs must each appear:"
for id in ehuemWC6Sk8 qaAeP8oVa80 _CYpRx6hlEM G3b6Y5qw-WE yvMW2wm25Hg; do
  grep -q "\"$id\"" assets/js/recordings.js && echo "ok   $id" || echo "MISSING $id"
done
echo "--- must find nothing (no hotlinked thumbnails):"
grep -n "ytimg" assets/js/recordings.js
echo "--- must find nothing (misspelling):"
grep -n "Keshyap" assets/js/recordings.js
echo "--- the embed must be nocookie:"
grep -n "youtube-nocookie.com/embed/" assets/js/recordings.js
```

Expected: five `ok` lines; no output from the `ytimg` grep; no output from the `Keshyap` grep; exactly one match for the nocookie embed.

- [ ] **Step 4: Add the script tag to `index.html`**

Find the script block near the bottom of `index.html` (currently ending at line 409 with `faq.js`) and add one line:

```html
			<script src="assets/js/papers.js"></script>
			<script src="assets/js/faq.js"></script>
			<script src="assets/js/recordings.js"></script>
```

This must happen before Step 5 — otherwise the module never loads and Step 5's console check passes vacuously.

- [ ] **Step 5: Verify the module loads and no-ops when its mount point is missing**

`#recordings-grid` does not exist until Task 3, so the module must load and quietly do nothing. Serve the site and read the console.

```bash
python3 -m http.server 8000 --directory . >/dev/null 2>&1 &
echo "serving on http://localhost:8000 (pid $!)"
```

Open `http://localhost:8000/index.html`, open DevTools → Console, reload.

Expected: **zero** JavaScript errors. Confirm the file actually loaded by checking the Network tab for `recordings.js` → `200`; without that, a clean console proves nothing. The page looks exactly as before (no Recordings section anywhere — correct at this point). If you see `Cannot read properties of null`, the `if (!target) return;` guard is missing or misplaced.

Stop the server when done: `kill %1`.

- [ ] **Step 6: Commit**

```bash
git add assets/js/recordings.js index.html
git commit -m "Add recordings module with click-to-play embeds

The YouTube iframe is created only when a visitor clicks a card, and it
points at youtube-nocookie.com, so no cookie is set and no request
reaches Google before that click."
```

---

### Task 3: The Recordings section — markup and styling

**Files:**
- Modify: `index.html` — nav `<li>` (after the "Program" entry, currently line 45); new `<section id="recordings">` between the Program section's closing `</section>` (currently line 234) and the Accepted Papers section (currently line 237).
- Modify: `assets/css/main.css` — append at end of file (currently 4165 lines).

**Interfaces:**
- Consumes: the class names and DOM shape produced by Task 2, and the thumbnails from Task 1.
- Produces: the visible section. Nothing later depends on it.

- [ ] **Step 1: Add the nav entry**

In the `<nav id="nav">` list, insert between the Program and Accepted Papers items:

```html
							<li><a href="#program">Program</a></li>
							<li><a href="#recordings">Recordings</a></li>
							<li><a href="#accepted">Accepted Papers</a></li>
```

The nav is generic — `assets/js/main.js` reads `#nav` and wires scrollex against whatever anchors it finds, with no hardcoded section list. No JS change is needed.

- [ ] **Step 2: Add the section markup**

Insert after the Program section's closing `</section>`, before the `<!-- Accepted Papers -->` comment. Indent with tabs to match its siblings.

```html
						<!-- Recordings -->
							<section id="recordings" class="main">
								<header class="major">
									<h2>Recordings</h2>
								</header>

								<p>Recordings of the workshop talks are available below. Press play to load the video from YouTube.</p>

								<div class="recordings-grid" id="recordings-grid"></div>

								<p class="paper-note">Cristina Olaverri-Monreal's talk was not recorded, at the speaker's request.</p>

								<p class="recordings-playlist"><a href="https://www.youtube.com/playlist?list=PLHJBSI3Tm1s8" target="_blank" rel="noopener">Watch the full playlist on YouTube</a></p>
							</section>
```

The playlist URL must match `PLAYLIST_URL` in `assets/js/recordings.js` exactly.

- [ ] **Step 3: Append the CSS**

Append to the very end of `assets/css/main.css`, after the file's current last line. Indent with tabs.

**The critical part is the `.recording-card__media` reset.** `main.css:1831-1854` styles every `button` on the page with `height: 2.75em`, `line-height: 2.75em`, `min-width: 9.25em`, `padding: 0 1.5em`, `display: inline-block`, and `white-space: nowrap`. Without the overrides below, the thumbnail buttons collapse into small pill shapes and the cards are visually broken. `.recording-card__media` (specificity 0,1,0) beats the bare `button` selector (0,0,1), so a single class is enough — no `!important` needed.

```css
	.recordings-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5em;
	}

	.recording-card {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: solid 1px #dddddd;
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 0.65em 1.8em rgba(99, 99, 99, 0.08);
	}

		.recording-card--featured {
			grid-column: 1 / -1;
		}

		/* Overrides the global button rules at main.css:1831. */
		.recording-card__media {
			position: relative;
			display: block;
			width: 100%;
			height: auto;
			min-width: 0;
			padding: 0;
			border: 0;
			border-radius: 0;
			line-height: normal;
			white-space: normal;
			aspect-ratio: 16 / 9;
			background-color: #000000;
			cursor: pointer;
			overflow: hidden;
		}

			.recording-card__thumb {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
			}

			.recording-card__media:hover .recording-card__thumb,
			.recording-card__media:focus-visible .recording-card__thumb {
				transform: scale(1.03);
				opacity: 0.85;
			}

			.recording-card__play {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 4.5rem;
				height: 4.5rem;
				margin: -2.25rem 0 0 -2.25rem;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.55);
				transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
			}

				/* The play triangle, drawn with borders so it needs no asset. */
				.recording-card__play:after {
					content: "";
					position: absolute;
					top: 50%;
					left: 50%;
					margin: -0.75rem 0 0 -0.5rem;
					border-style: solid;
					border-width: 0.75rem 0 0.75rem 1.25rem;
					border-color: transparent transparent transparent #ffffff;
				}

			.recording-card__media:hover .recording-card__play,
			.recording-card__media:focus-visible .recording-card__play {
				background-color: #f2849e;
				transform: scale(1.08);
			}

		.recording-card__player {
			display: block;
			width: 100%;
			aspect-ratio: 16 / 9;
			border: 0;
		}

		.recording-card__body {
			padding: 1.25em 1.5em 1.5em 1.5em;
		}

			.recording-card__title {
				margin: 0 0 0.4em 0;
				font-size: 1em;
				line-height: 1.5;
			}

			.recording-card__speaker {
				margin: 0;
				font-size: 0.9em;
				color: #636363;
			}

	.recordings-playlist {
		margin: 0;
		font-size: 0.9em;
	}

	@media screen and (max-width: 980px) {

		.recordings-grid {
			grid-template-columns: 1fr;
		}

	}
```

`#f2849e` is the accent pink already used by this Stellar theme; it is what makes the hover state look native rather than bolted on. The `980px` breakpoint matches the one `.paper-explorer` already collapses at (`main.css:4106`), so both grids reflow at the same width.

- [ ] **Step 4: Verify no Google request happens on page load**

```bash
python3 -m http.server 8000 --directory . >/dev/null 2>&1 &
echo "serving on http://localhost:8000 (pid $!)"
```

Open `http://localhost:8000/index.html`, DevTools → **Network** tab, tick "Disable cache", reload, and filter by `google`, then by `ytimg`, then by `youtube`.

Expected: **zero** matching requests in all three filters. Every thumbnail request goes to `localhost:8000/images/recordings/<ID>.jpg` and returns `200`.

If a request to `i.ytimg.com` appears, a thumbnail `src` is still hotlinked — fix `recordings.js`.

- [ ] **Step 5: Verify the section renders and click-to-play works**

With the server still running, on the same page:

1. Click "Recordings" in the nav. Expected: the page scrolls to the new section, and the nav item highlights like the others.
2. Expected layout at full desktop width: Johannes Betz's card spans the full content width, and the remaining four sit in a 2×2 grid beneath it, in the order Hongyang Li, Kashyap Chitta, Milan Ganai, Felix Fent.
3. Expected on each card: a 16:9 thumbnail with a dark circular play button centred on it; below it the talk title in bold and `Speaker · Affiliation` in grey.
4. Hover any thumbnail. Expected: the play circle turns pink (`#f2849e`) and grows slightly.
5. Click any thumbnail. Expected: the thumbnail is replaced in place by a YouTube player that starts playing, at the same size, without the card or the grid reflowing.
6. Check the Network tab again after that click. Expected: requests now go to `www.youtube-nocookie.com`, and **not** to `www.youtube.com`.
7. Press `Tab` repeatedly until a thumbnail is focused, then press `Enter`. Expected: the player loads, exactly as with the mouse.
8. Narrow the window below 980px. Expected: the grid collapses to one column; every card, including Betz's, is full width; nothing overflows horizontally.
9. Verify the footnote reads "Cristina Olaverri-Monreal's talk was not recorded, at the speaker's request." and that the playlist link opens the playlist in a new tab.

Stop the server: `kill %1`.

If any expectation fails, fix it before committing. Do not commit a section you have not looked at in a browser.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "Add Recordings section with click-to-play cards

The opening talk is featured full-width above a 2x2 grid of the four
remaining talks, in program order. A footnote explains the one talk that
is absent."
```

---

### Task 4: Convert forward-looking prose to past tense

**Files:**
- Modify: `index.html` — header (currently lines 32-37), About section (currently lines 62-78), Program intro (currently line 172).

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. Independent of Tasks 1-3; kept separate so the recordings diff stays reviewable on its own.

Strictly out of scope: the program table, the Accepted Papers section, the FAQ, the Organizers section, the footer. Several FAQ entries are now moot (poster format, in-person presentation requirement, camera-ready instructions), but cleaning those up is a separate task the user has explicitly deferred. **Do not touch `assets/js/faq.js`.**

- [ ] **Step 1: Header — mark the date as past**

Replace the calendar line only. Keep the room; keep the "Half-day Workshop" line; keep the location line.

Find:

```html
						<a href="#" class="icon solid solo fa-calendar-alt"><span class="label">Calendar</span></a> 1st June 2026, 14:00 – 17:45 | Room Strauss 1<br/>
```

Replace with:

```html
						<a href="#" class="icon solid solo fa-calendar-alt"><span class="label">Calendar</span></a> Held on 1st June 2026, 14:00 – 17:45 | Room Strauss 1<br/>
```

- [ ] **Step 2: About section — convert to past tense**

Find the three forward-looking sentences and replace them. The first paragraph's opening ("Autonomous driving has made remarkable progress… This question can be answered from different angles…") is timeless — leave it alone.

Find:

```html
This workshop will go beyond abstract discussions by confronting participants with the real challenges of generalization in autonomous driving. 
We will stage a direct dialogue between two competing paradigms: (1) modular, open-source ecosystems that thrive on community-driven collaboration, and (2) data-hungry end-to-end approaches 
that aim to scale through massive models and datasets. 
What makes this workshop unique is its hands-on character: participants will experience a live, livestreamed demonstration of the TUM EDGAR autonomous vehicle driving on public roads in Munich, 
providing a concrete basis for in-depth discussions on robustness, safety, and scalability. 
Through keynotes, interactive sessions, and real-world experiments on topics like domain adaptation, sim-to-real transfer, self-supervised and continual learning, evaluation benchmarks, 
and software engineering practices,
we will collectively ask: <strong> which paradigm — modular, end-to-end, or hybrid — can truly deliver
generalization in AVs? </strong>
```

Replace with:

```html
This workshop went beyond abstract discussions, confronting participants with the real challenges of generalization in autonomous driving. 
We staged a direct dialogue between two competing paradigms: (1) modular, open-source ecosystems that thrive on community-driven collaboration, and (2) data-hungry end-to-end approaches 
that aim to scale through massive models and datasets. 
What made this workshop unique was its hands-on character: participants experienced a live, livestreamed demonstration of the TUM EDGAR autonomous vehicle driving on public roads in Munich, 
providing a concrete basis for in-depth discussions on robustness, safety, and scalability. 
Through keynotes, interactive sessions, and real-world experiments on topics like domain adaptation, sim-to-real transfer, self-supervised and continual learning, evaluation benchmarks, 
and software engineering practices,
we collectively asked: <strong> which paradigm — modular, end-to-end, or hybrid — can truly deliver
generalization in AVs? </strong>
```

The trailing spaces at line ends are present in the original. Preserve them; they are inside a `<p>` and harmless, and keeping them shrinks the diff.

- [ ] **Step 3: Program intro — convert to past tense and drop the Zoom invitation**

The Zoom sentence has always contradicted the FAQ, which states that virtual participation is not available. After the event it is simply wrong. Remove it.

Find:

```html
									<p> The workshop will feature prominent speakers, and contributions from the intelligent vehicles and mobile robotics community. </br> The workshop is happening in-person at ICRA 2026 in Vienna. Additionally we welcome participants to listen and contribute virtually via Zoom.</p>
```

Replace with:

```html
									<p> The workshop featured prominent speakers and contributions from the intelligent vehicles and mobile robotics community. </br> The workshop took place in person at ICRA 2026 in Vienna.</p>
```

- [ ] **Step 4: Verify no forward-looking prose survives in the converted regions**

```bash
echo "--- must find nothing:"
grep -n "will go beyond\|We will stage\|will experience\|we will collectively ask\|will feature\|is happening in-person\|virtually via Zoom" index.html
echo "--- must find the past-tense replacements:"
grep -c "went beyond\|We staged\|participants experienced\|we collectively asked\|The workshop featured\|took place in person\|Held on 1st June" index.html
```

Expected: no output from the first grep. The second prints `6`.

`grep -c` counts matching **lines**, not matches, and the count is 6 rather than 7 because `The workshop featured` and `took place in person` both sit on the single `<p>` line of the Program intro. The six lines are: the header, `went beyond`, `We staged`, `participants experienced`, `we collectively asked`, and the Program intro.

If the number is lower, a replacement was missed. Read the diff before assuming the count is wrong.

- [ ] **Step 5: Read the rendered page**

```bash
python3 -m http.server 8000 --directory . >/dev/null 2>&1 &
```

Open `http://localhost:8000/index.html` and read the About section and the Program intro out loud.

Expected: every sentence is in past tense and grammatical. There is no invitation to attend, register, or join via Zoom anywhere in those two blocks. The header reads "Held on 1st June 2026".

Stop the server: `kill %1`.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Rewrite workshop prose in past tense

The workshop took place on 1 June 2026, so the header, About section,
and Program intro no longer describe it as upcoming. The Zoom invitation
in the Program intro is dropped: it contradicted the FAQ, which says
virtual participation was never available.

The FAQ itself is deliberately left alone; several entries are now moot
and cleaning them up is a separate change."
```

---

## Final verification

- [ ] **Run the whole-file checks**

```bash
node --check assets/js/recordings.js && echo "js ok"
echo "--- no stray 'video' naming (expect only YouTube-concept uses):"
grep -rn "video-card\|#video-grid\|videos\.js\|images/video/" index.html assets/js assets/css || echo "clean"
echo "--- no hotlinked thumbnails anywhere:"
grep -rn "ytimg" index.html assets/js assets/css || echo "clean"
echo "--- git is clean:"
git status --short
```

Expected: `js ok`, then `clean`, `clean`, and no output from `git status --short`.

- [ ] **Final browser pass**

Serve, hard-reload, and confirm end to end: the Recordings nav entry scrolls to the section; Betz's card is featured; all five thumbnails load from `localhost`; clicking any card starts a `youtube-nocookie.com` player; the page below 980px is a single readable column; the About and Program text reads as a past event.

- [ ] **Confirm the commit sequence**

```bash
git log --oneline -4
```

Expected, newest first: the tense rewrite, the Recordings section, the recordings module, the thumbnails.
