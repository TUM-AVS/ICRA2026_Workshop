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
