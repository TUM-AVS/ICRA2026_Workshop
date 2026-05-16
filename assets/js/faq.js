(function () {
	"use strict";

	// Add FAQ entries here. `answer` can contain simple inline HTML such as links.
	var faqItems = [
		{
			question: "Will accepted papers be available for download?",
			answer: "Yes. The accepted papers are listed on this website and can be downloaded from the Accepted Papers section."
		},
		{
			question: "Will accepted papers appear in archival proceedings?",
			answer: "No. This workshop follows a non-archival format. Accepted papers will not be included in official archival proceedings and will only be published on the workshop website."
		},
		{
			question: "Can I submit work that has already been published or submitted elsewhere?",
			answer: "Yes. Since this workshop is non-archival, submissions of already published work, ongoing research, or work submitted to other venues are welcome."
		},
		{
			question: "Is virtual participation possible?",
			answer: "Unfortunately, virtual participation is not available. Presentations and poster sessions require in-person participation."
		},
		{
			question: "Does the presenter have to be one of the paper authors?",
			answer: "Not necessarily. If none of the authors can attend, another qualified person may present the poster on behalf of the authors. The presenter does not have to be listed as an author."
		},
		{
			question: "Is in-person presentation mandatory?",
			answer: "Yes. Accepted papers presented at the workshop must be represented on-site during the poster session by either an author or another qualified representative."
		},
		{
			question: "What poster format should I use?",
			answer: "Posters should be in portrait orientation and should not exceed DIN A0 format (841 × 1189 mm / 84.1 × 118.9 cm / 33.11 × 46.81 inches)."
		},
		{
			question: "Do I need to address reviewer comments in the camera-ready version?",
			answer: "Yes. Authors are encouraged to address reviewer comments and suggestions as far as reasonably possible before submitting the final version."
		},
		{
			question: "Can author names be added in the camera-ready version?",
			answer: "Yes. Please ensure that all author names are included in the final camera-ready submission if they were omitted in the initial anonymous submission."
		},
		{
			question: "Can accepted workshop papers still be submitted to conferences or journals later?",
			answer: "Yes. Since this workshop is non-archival, presenting your work here generally does not prevent future submissions to conferences or journals. Authors should nevertheless verify policies of their target venues."
		},
		{
			question: "Can I upload my paper to arXiv?",
			answer: "Yes. Authors are free to upload their work to arXiv or personal websites."
		},
		{
			question: "Whom should I contact if I have further questions?",
			answer: "Please feel free to contact the workshop organizers via email at any time."
		}
	];

	function escapeHtml(value) {
		return String(value || "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}

	function renderFaq() {
		var container = document.getElementById("faq-list");
		if (!container) {
			return;
		}

		container.innerHTML = faqItems.map(function (item) {
			return [
				'<details class="faq-item">',
					'<summary>',
						'<span>' + escapeHtml(item.question) + '</span>',
					'</summary>',
					'<div class="faq-answer">',
						item.answer || "",
					'</div>',
				'</details>'
			].join("");
		}).join("");
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", renderFaq);
	} else {
		renderFaq();
	}
})();
