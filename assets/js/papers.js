(function () {
	"use strict";

	var acceptedPapers = [
		{
			id: 1,
			title: "V2V-GoT: Vehicle-to-Vehicle Cooperative Autonomous Driving with Multimodal Large Language Models and Graph-of-Thoughts",
			authors: [
				{ name: "Hsu-kuang Chiu", url: "https://openreview.net/profile?id=~Hsu-kuang_Chiu2" },
				{ name: "Ryo Hachiuma", url: "https://openreview.net/profile?id=~Ryo_Hachiuma1" },
				{ name: "Chien-Yi Wang", url: "https://openreview.net/profile?id=~Chien-Yi_Wang1" },
				{ name: "Yu-Chiang Frank Wang", url: "https://openreview.net/profile?id=~Yu-Chiang_Frank_Wang2" },
				{ name: "Min-Hung Chen", url: "https://openreview.net/profile?id=~Min-Hung_Chen2" },
				{ name: "Stephen F Smith", url: "https://openreview.net/profile?id=~Stephen_F_Smith1" }
			],
			abstract: "Current state-of-the-art autonomous vehicles could face safety-critical situations when their local sensors are occluded by large nearby objects on the road. Vehicle-to-vehicle (V2V) cooperative autonomous driving has been proposed as a means of addressing this problem, and one recently introduced framework for cooperative autonomous driving has further adopted an approach that incorporates a Multimodal Large Language Model (MLLM) to integrate cooperative perception and planning processes. However, despite the potential benefit of applying graph-of-thoughts reasoning to the MLLM, this idea has not been considered by previous cooperative autonomous driving research. In this paper, we propose a novel graph-of-thoughts framework specifically designed for MLLM-based cooperative autonomous driving. Our graph-of-thoughts includes our proposed novel ideas of occlusion-aware perception and planning-aware prediction. We curate the V2V-GoT-QA dataset and develop the V2V-GoT model for training and testing the cooperative driving graph-of-thoughts. Our experimental results show that our method outperforms other baselines in cooperative perception, prediction, and planning tasks. Our code and dataset are publicly released to facilitate open-source research.",
			spotlight: true,
			pdf: "paper/ICRA2026_GenAV_V2V_GoT_Vehicle_to_Vehicle_FS.pdf"
		},
		{
			id: 2,
			title: "Perceptual Motor Learning for Zero-Shot Generalization in Autonomous Lateral Control",
			authors: [
				{ name: "Elahe Delavari", url: "https://openreview.net/profile?id=~Elahe_Delavari1" },
				{ name: "John Moore" },
				{ name: "Junho Hong", url: "https://openreview.net/profile?id=~junho_hong1" },
				{ name: "Jaerock Kwon", url: "https://openreview.net/profile?id=~Jaerock_Kwon2" }
			],
			abstract: "Generalization to unseen environments remains the central unsolved challenge for autonomous driving systems. This paper presents a Perceptual Motor Learning (PML) framework inspired by the Active Inference principle of prediction-error minimization, enabling robust lateral control without retraining. PML learns a forward generative model that predicts the sensory consequences of steering actions and selects actions whose predicted outcomes best match a preferred visual state. Implemented as a U-Net-based transition model evaluated via the Structural Similarity Index, the system requires only a monocular visual input and no privileged sensing (no LiDAR, GPS, or HD maps). Trained exclusively in one CARLA simulator town, PML achieves 100% success on straight, one-turn, and two-turn tracks in two entirely unseen towns, outperforming Behavioral Cloning and Proximal Policy Optimization-based Reinforcement Learning baselines in cross-domain transfer. On the CoRL2017 benchmark, PML delivers 92% success in an unseen test town despite training only in a structurally disjoint third town. These results indicate that compact predictive world models grounded in prediction-error minimization provide a principled, data-efficient path toward zero-shot generalization in autonomous driving.",
			pdf: "paper/ICRA2026_GenAV_Perceptual_Motor_Learning_FS.pdf"
		},
		{
			id: 3,
			title: "Scene2DENM: End-to-End DENM Generation from Traffic Video for Cooperative Autonomous Driving",
			authors: [
				{ name: "Kailin Tong", url: "https://openreview.net/profile?id=~Kailin_Tong1" },
				{ name: "Baoyun Wang", url: "https://openreview.net/profile?id=~Baoyun_Wang2" },
				{ name: "Kanan Mujkic" },
				{ name: "Christoph Pilz", url: "https://openreview.net/profile?id=~Christoph_Pilz1" },
				{ name: "Xingcheng Zhou", url: "https://openreview.net/profile?id=~Xingcheng_Zhou1" },
				{ name: "Selim Solmaz" },
				{ name: "Jelena Rubesa-Zrim" },
				{ name: "Daniel Watzenig", url: "https://openreview.net/profile?id=~Daniel_Watzenig1" },
				{ name: "Arno Eichberger" },
				{ name: "Bo Leng", url: "https://openreview.net/profile?id=~Bo_Leng1" }
			],
			abstract: "Cooperative Intelligent Transportation Systems (C-ITS) rely on standardized safety messages for low-latency, interoperable exchange of risk information. Yet existing traffic video understanding benchmarks do not study how visual scene understanding can be translated into protocol-compliant communication, limiting the evaluation of end-to-end autonomous driving systems beyond perception outputs. We introduce Scene2DENM, a new task and benchmark for generating ETSI Decentralized Environmental Notification Messages (DENMs) directly from traffic video. Under explicit schema constraints, the model jointly performs hazard detection, event/cause/sub-cause inference, temporally grounded normalized 2D localization, and evidence-consistent description generation. To support this task, we convert the TUMTraf VideoQA dataset into a DENM-aligned benchmark comprising clips with structured instructions and schema-constrained targets. We then fine-tune TraffiX-Qwen via instruction tuning for structured DENM generation. Evaluation on a held-out validation set shows that fine-tuning removes format violations and substantially improves situation detection, while achieving grounded localization and strong description quality. Scene2DENM provides, to our knowledge, the first quantitative benchmark for structured video-to-standard message generation, bridging traffic scene understanding, standardized V2X communication, and cooperative situational awareness for real-world autonomous driving systems.",
			pdf: "paper/ICRA2026_GenAV_Scene2DENM_End_to_End_DENM_FS.pdf"
		},
		{
			id: 4,
			title: "Semantic-Aware Hierarchical 3D Gaussian Representation for Autonomous Driving Simulation",
			authors: [
				{ name: "Chao Li", url: "https://openreview.net/profile?id=~Chao_Li81" },
				{ name: "Chenpeng Yao", url: "https://openreview.net/profile?id=~Chenpeng_Yao1" },
				{ name: "Chengju Liu", url: "https://openreview.net/profile?id=~Chengju_Liu1" },
				{ name: "Qijun Chen", url: "https://openreview.net/profile?id=~Qijun_Chen2" }
			],
			abstract: "3D Gaussian Splatting (3DGS) has recently emerged as an efficient paradigm for high-fidelity urban scene reconstruction in autonomous driving simulation. However, existing methods rely on globally uniform representations, leading to severe redundancy and inefficient resource allocation in large-scale scenes. Moreover, limited viewpoints and occlusions result in insufficient supervision, causing blurry textures and degraded multi-view consistency. To address these challenges, we propose a semantic-aware hierarchical 3D Gaussian representation that jointly optimizes anchor distribution and level-of-detail across different semantic regions. Specifically, we introduce a semantic-guided anchor allocation strategy to adaptively control Gaussian density, along with a category-aware LOD mechanism for efficient multi-scale rendering. To further alleviate supervision scarcity, we incorporate diffusion-based pseudo-view augmentation to enrich training signals under occlusions. In addition, a multi-view consistency loss is designed to enforce geometric and photometric alignment across views. Building upon these designs, we establish a complete pipeline from 3D reconstruction to simulation data synthesis. Extensive experiments demonstrate that our method achieves superior rendering quality and geometric accuracy while reducing computational overhead, making it well-suited for autonomous driving simulation.",
			presented: false,
			pdf: "paper/ICRA2026_GenAV_Semantic_Aware_Hierarchical_FS.pdf"
		},
		{
			id: 5,
			title: "Collaborative Multi-Agent Testing for Emergent Failure Discovery in Autonomous Driving Systems",
			authors: [
				{ name: "Ruizhen Gu", url: "https://openreview.net/profile?id=~Ruizhen_Gu1" },
				{ name: "Konstantinos Koufos", url: "https://openreview.net/profile?id=~Konstantinos_Koufos1" },
				{ name: "Donghwan Shin", url: "https://openreview.net/profile?id=~Donghwan_Shin1" },
				{ name: "Vahid Garousi", url: "https://openreview.net/profile?id=~Vahid_Garousi1" },
				{ name: "Mehrdad Dianati", url: "https://openreview.net/profile?id=~Mehrdad_Dianati1" }
			],
			abstract: "Autonomous Driving Systems (ADS) can fail because of faults within individual modules as well as from interactions across perception, planning, and control. Yet existing ADS testing research often treats key testing functions, such as perturbation generation, behavioural assessment, and test case selection and exploration, as loosely coupled steps rather than coordinated roles for discovering such failures. We present CREAD, a collaborative multi-agent testing framework for testing ADS that organises perturbation generation, behavioural validation, and search coordination through a shared blackboard and an orchestrator. In the current work-in-progress instantiation, the framework focuses on perception-oriented perturbation generation, while remaining extensible to other ADS modules, including planning and control. It currently comprises a Perception Fuzzer Agent, a Metamorphic Validator Agent, and an Orchestrator Agent. Respectively, they generate perturbations, assess behavioural consistency across related scenario pairs, and coordinate further exploration. Experiments in HighwayEnv simulator show that the collaborative configuration improves failure discovery in the highway environment and remains competitive in the roundabout setting. These results suggest that collaborative multi-agent testing is a promising research direction for emergent ADS behaviour discovery.",
			pdf: "paper/ICRA2026_GenAV_Collaborative_Multi_Agent_Testing_FS.pdf"
		},
		{
			id: 6,
			title: "AD4AD: Benchmarking Visual Anomaly Detection Models for Safer Autonomous Driving",
			authors: [
				{ name: "Fabrizio Genilotti", url: "https://openreview.net/profile?id=~Fabrizio_Genilotti1" },
				{ name: "Gionata Grotto", url: "https://openreview.net/profile?id=~Gionata_Grotto1" },
				{ name: "Arianna Stropeni", url: "https://openreview.net/profile?id=~Arianna_Stropeni1" },
				{ name: "Manuel Barusco", url: "https://openreview.net/profile?id=~Manuel_Barusco1" },
				{ name: "Francesco Borsatti", url: "https://openreview.net/profile?id=~Francesco_Borsatti1" },
				{ name: "Davide Dalle Pezze", url: "https://openreview.net/profile?id=~Davide_Dalle_Pezze1" },
				{ name: "Gian Antonio Susto", url: "https://openreview.net/profile?id=~Gian_Antonio_Susto3" }
			],
			abstract: "The reliability of a machine vision system for autonomous driving depends heavily on its training data distribution. When a vehicle encounters significantly different conditions, such as atypical obstacles, its perceptual capabilities can degrade substantially. Unlike many domains where errors carry limited consequences, failures in autonomous driving translate directly into physical risk for passengers, pedestrians, and other road users. To address this challenge, we explore Visual Anomaly Detection (VAD) as a solution. VAD enables the identification of anomalous objects not present during training, allowing the system to alert the driver when an unfamiliar situation is detected. Crucially, VAD models produce pixel-level anomaly maps that can guide driver attention to specific regions of concern without requiring any prior assumptions about the nature or form of the hazard. We benchmark eight state-of-the-art VAD methods on AnoVox, the largest synthetic dataset for anomaly detection in autonomous driving. Our results demonstrate that VAD transfers effectively to road scenes. Notably, Tiny-Dinomaly achieves the best accuracy-efficiency trade-off for edge deployment, matching full-scale localization performance at a fraction of the memory cost.",
			spotlight: true,
			pdf: "paper/initial_submissions/ICRA2026_GenAV_AD4AD_Benchmarking_Visual_Anomaly_Detection_IS.pdf"
		},
		{
			id: 7,
			title: "DOPE: Dynamic Obstacle Parking Environment for End-to-End Autonomous Parking in CARLA",
			authors: [
				{ name: "Min Hee Jo", url: "https://openreview.net/profile?id=~Min_Hee_Jo1" },
				{ name: "Christian Juette", url: "https://openreview.net/profile?id=~Christian_Juette1" },
				{ name: "Alexey Vinel", url: "https://openreview.net/profile?id=~Alexey_Vinel1" }
			],
			abstract: "End-to-End learning has recently attracted growing interest for autonomous parking, as it enables policies to directly map sensor observations to control commands and potentially learn human-like behaviors in complex environments. In particular, such approaches are expected to generalize better than traditional modular pipelines when trained on sufficiently diverse data. However, existing methods are typically trained and evaluated in static, deterministic environments that fail to capture the variability and interactions present in real-world parking scenarios. Although these limitations have been acknowledged, there is currently no standardized simulation framework for E2E parking that systematically incorporates dynamic and stochastic behaviors. To address this gap, we introduce Dynamic Obstacle Parking Environment (DOPE), a closed-loop CARLA-based simulation environment with dynamic scenarios designed to evaluate E2E parking models under interactive conditions. Rather than inducing failures through adversarial or overly aggressive behaviors, DOPE introduces controlled stochasticity and state-based dynamic interactions that reflect common perturbations in a parking lot. Using this framework, we evaluate several state-of-the-art E2E parking models that were not trained under such complex conditions. These results indicate that current E2E parking models are highly sensitive to distribution shift and struggle to generalize to various environments.",
			pdf: "paper/ICRA2026_GenAV_DOPE_Dynamic_Obstacle_Parking_FS.pdf"
		},
		{
			id: 8,
			title: "Towards Multi-Object-Tracking with Radar on a Fast Moving Vehicle: On the Potential of Processing Radar in the Frequency Domain",
			authors: [
				{ name: "Tim Hansen" },
				{ name: "Arturo Gomez Chavez", url: "https://openreview.net/profile?id=~Arturo_Gomez_Chavez1" },
				{ name: "Ilya Shimchik" },
				{ name: "Andreas Birk", url: "https://openreview.net/profile?id=~Andreas_Birk1" }
			],
			abstract: "We promote in this paper the processing of radar data in the frequency domain to achieve higher robustness against noise and structural errors, especially in comparison to feature-based methods. This holds also for high dynamics in the scene, i.e., ego-motion of the vehicle with the sensor plus the presence of an unknown number of other moving objects. In addition to the high robustness, the processing in the frequency domain has the so far neglected advantage that the underlying correlation based methods used for, e.g., registration, provide information about all moving structures in the scene. A typical automotive application case is overtaking maneuvers, which in the context of autonomous racing are used here as a motivating example. Initial experiments and results with Fourier SOFT in 2D (FS2D) are presented that use the Boreas dataset to demonstrate radar-only-odometry, i.e., radar-odometry without sensor-fusion, to support our arguments.",
			pdf: "paper/initial_submissions/ICRA2026_GenAV_Multi_Object_Tracking_Radar_IS.pdf"
		},
		{
			id: 9,
			title: "Radar-Informed 3D Multi-Object Tracking under Adverse Conditions",
			authors: [
				{ name: "Bingxue Xu", url: "https://openreview.net/profile?id=~Bingxue_Xu1" },
				{ name: "Emil Hedemalm" },
				{ name: "Ajinkya Khoche" },
				{ name: "Patric Jensfelt" },
			],
			abstract: "The challenge of 3D multi-object tracking is achieving robustness in real-world applications, for example under adverse conditions and maintaining consistency as distance increases. To overcome these challenges, sensor fusion approaches that combine LiDAR, cameras, and radar have emerged. However, existing multimodal fusion methods usually treat radar as another learned feature inside the network. When the overall model degrades in difficult environmental conditions, the robustness advantages that radar could provide are also reduced. In this paper, we propose RadarMOT, a radar-informed 3D MOT framework that explicitly uses radar point cloud data as additional observation to refine state estimation and recover detector misses at long ranges. Evaluations on the MAN-TruckScenes dataset show that RadarMOT consistently improves the Average Multi-Object Tracking Accuracy (AMOTA) by 12.7% at long range and up to 10.3% in adverse weather.",
			spotlight: true,
			pdf: "paper/ICRA2026_GenAV_Radar_Informed_3D_Multi_Object_Tracking_FS.pdf"
		},
		{
			id: 10,
			title: "SimForge: Generalization in Autonomous Driving through City-Scale Digital Twins and Simulation",
			authors: [
				{ name: "Sourang Sri hari", url: "https://openreview.net/profile?id=~Sourang_Sri_hari2" },
				{ name: "Dibyendusekhar Goswami", url: "https://openreview.net/profile?id=~Dibyendusekhar_Goswami1" },
				{ name: "Michael Vu", url: "https://openreview.net/profile?id=~Michael_Vu1" },
				{ name: "Anuj Gupta", url: "https://openreview.net/profile?id=~Anuj_Gupta5" },
				{ name: "Mayank Gupta", url: "https://openreview.net/profile?id=~Mayank_Gupta8" },
				{ name: "Abhishek Shinde", url: "https://openreview.net/profile?id=~Abhishek_Shinde3" },
				{ name: "Ayush Gupta", url: "https://openreview.net/profile?id=~Ayush_Gupta10" }
			],
			abstract: "The critical bottleneck limiting AV generalization lies not in architectural capacity but in the breadth and coherence of training distributions across geographies, conditions, and failure modes. We present SimForge, a scalable data generation engine for safety critical and adversarial driving scenarios, addressing three coupled problems: world coverage, scenario relevance, and controlled diversity. SimScene reconstructs simulation ready digital twins and HD maps from aerial and dashcam imagery, grounded in real world risk through an accident and near miss abstraction loop. SimCloud enables scenario authoring through a road relative representation allowing reinstantiation across digital twins, and expands individual scenarios into dataset families by systematically varying environment conditions. The pipeline is paradigm agnostic: it produces distributional infrastructure to empirically test generalization under modular, end to end, or hybrid architectures.",
			pdf: "paper/ICRA2026_GenAV_SimForge_Generalization_FS.pdf"
		},
		{
			id: 11,
			title: "Lane-Topology-Guided Motion Forecasting via Feasible Motion Primitive Selection",
			authors: [
				{ name: "Sangjin Han", url: "https://openreview.net/profile?id=~Sangjin_Han1" },
				{ name: "Hoseong Jung", url: "https://openreview.net/profile?id=~Hoseong_Jung1" },
				{ name: "Jeongtae Her" },
				{ name: "Changhyun Choi", url: "https://openreview.net/profile?id=~Changhyun_Choi2" },
				{ name: "H. Jin Kim", url: "https://openreview.net/profile?id=~H._Jin_Kim1" }
			],
			abstract: "Lane topology provides a strong structural prior for motion forecasting in autonomous driving systems designed to generalize across diverse road geometries. To be useful for safe downstream planning, predictions should be not only accurate but also feasible and diverse, covering a range of plausible future behaviors. However, existing predictors often neglect lane-topology consistency in lower-probability modes, producing trajectories that violate lane connectivity or traffic rules. In this paper, we propose a topology-aware forecasting framework designed to improve the structural reliability of multimodal predictions across varying road geometries. Specifically, we use a VQ-VAE to learn shape-aware motion primitives as discrete intention queries, capturing spatiotemporal patterns beyond endpoint-based intentions. We further introduce a feasibility-aware intention selector trained with a lane-topology prior to filter unreachable intention queries, guiding the decoder to prioritize topology-consistent intentions while preserving behavioral diversity. Extensive experiments on the Argoverse 2 dataset demonstrate that our method achieves prediction accuracy comparable to state-of-the-art baselines while outperforming them in feasibility and diversity metrics.",
			spotlight: true,
			pdf: "paper/ICRA2026_GenAV_Lane_Topology_Guided_Motion_Forecasting_FS.pdf"
		},
		{
			id: 12,
			title: "Towards a Fully Differentiable Framework for Autonomous Driving Based on Model-Structured Neural Networks",
			authors: [
				{ name: "Sabrina Ciuffoletti", url: "https://openreview.net/profile?id=~Sabrina_Ciuffoletti1" },
				{ name: "Gioele DEFRANCESCO", url: "https://openreview.net/profile?id=~Gioele_DEFRANCESCO1" },
				{ name: "Giovanni Scialla", url: "https://openreview.net/profile?id=~Giovanni_Scialla1" },
				{ name: "Mattia Piazza", url: "https://openreview.net/profile?id=~Mattia_Piazza1" },
				{ name: "Sebastiano Taddei", url: "https://openreview.net/profile?id=~Sebastiano_Taddei1" },
				{ name: "Gastone Pietro Rosati Papini", url: "https://openreview.net/profile?id=~Gastone_Pietro_Rosati_Papini1" }
			],
			abstract: "Generalization in autonomous driving remains an open challenge, with current approaches divided between modular pipelines, which ensure interpretability and safety, and end-to-end learning methods, which offer flexibility but limited guarantees. This work proposes a hybrid framework that combines these paradigms through MSNN within a fully differentiable architecture. The system integrates vehicle dynamics modeling, control, and motion planning into a unified pipeline. A structured neural forward model is first identified from data, followed by the learning of an inverse controller through a closed-loop, mental simulation approach. A neural planner, based on a modular motion planning structure, is then connected to the control layer, enabling end-to-end training and joint optimization. The entire process is supported by nnodely, an open-source framework for the design and training of MSNN. The paper presents the structure of each module and the integration within the control pipeline. The complete system is validated in closed-loop simulations in IPG CarMaker, where the planner network is directly connected to the inverse model to control the vehicle. Results highlight the potential of structured neural approaches for achieving robust and generalizable autonomous driving.",
			pdf: "paper/ICRA2026_GenAV_Fully_Differentiable_Framework_FS.pdf"
		},
		{
			id: 13,
			title: "Self-Paced Curriculum Reinforcement Learning for Autonomous Superbike Racing in Simulation",
			authors: [
				{ name: "Luca Ghisi", url: "https://openreview.net/profile?id=~Luca_Ghisi1" },
				{ name: "Jacopo Essenziale" },
				{ name: "Carlo D'Eramo", url: "https://openreview.net/profile?id=~Carlo_D%27Eramo2" },
				{ name: "Matteo Luperto", url: "https://openreview.net/profile?id=~Matteo_Luperto1" }
			],
			abstract: "Autonomous Racing has seen remarkable progress through deep Reinforcement Learning (RL), primarily for four-wheeled vehicles. However, motorbikes introduce substantially greater complexity due to the need to manage balance and lean angle, in addition to more reactive steering and throttle control, and a smaller weight. In this work, we present a framework for training an autonomous agent to race a superbike in VRider SBK, a physics-accurate Unity-based motorbike simulator. Our approach integrates Soft Actor-Critic (SAC) with Self-Paced curriculum Deep Reinforcement Learning (SPDL), which dynamically generates progressively more challenging tasks based on the agent's performance - without requiring manual curriculum design. The agent's state space comprises proprioceptive features extended with lean-angle history, along with global track features via course points. The reward signal is shaped to encourage progress along the track while penalising instability-inducing behaviours specific to two-wheeled dynamics. Preliminary experimental results demonstrate that SPDL outperforms SAC alone in training efficiency, lap time, and driving stability across multiple tracks and motorbike models, establishing a first baseline for RL-based autonomous motorbike racing.",
			spotlight: true,
			pdf: "paper/ICRA2026_GenAV_Self_Paced_Curriculum_Reinforcement_Learning_FS.pdf"
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

	function paperMatches(paper, query) {
		var haystack = [paper.title, getAuthorText(paper), paper.abstract].join(" ").toLowerCase();
		return haystack.indexOf(query) !== -1;
	}

	function getAuthorText(paper) {
		return paper.authors.map(function (author) {
			return author.name;
		}).join(", ");
	}

	function renderAuthors(authors) {
		return authors.map(function (author) {
			if (author.url) {
				return '<a href="' + escapeHtml(author.url) + '" target="_blank" rel="noopener">' + escapeHtml(author.name) + '</a>';
			}

			return escapeHtml(author.name);
		}).join(", ");
	}

	function getAbstractParts(abstract) {
		var limit = 260;
		var breakpoint;

		if (abstract.length <= limit) {
			return {
				teaser: abstract,
				remainder: ""
			};
		}

		breakpoint = abstract.lastIndexOf(" ", limit);
		if (breakpoint < 180) breakpoint = limit;

		return {
			teaser: abstract.slice(0, breakpoint).trim(),
			remainder: abstract.slice(breakpoint).trim()
		};
	}

	function renderPapers(papers) {
		var target = document.getElementById("paper-explorer");

		if (!target) return;

		if (!papers.length) {
			target.innerHTML = '<p class="paper-empty">No accepted papers match this search.</p>';
			return;
		}

		target.innerHTML = papers.map(function (paper) {
			var abstractParts = getAbstractParts(paper.abstract);
			var toggle = abstractParts.remainder ? '<button class="paper-card__toggle" type="button" aria-expanded="false">Read more</button>' : "";
			var posterTag = paper.presented === false ? "Poster not presented" : "Poster presented";
			var spotlightTag = paper.spotlight ? '<span class="paper-card__tag paper-card__tag--spotlight">Spotlight presented</span>' : "";

			return [
				'<article class="paper-card">',
					'<div class="paper-card__meta">',
						'<span class="paper-card__number">Paper ' + escapeHtml(paper.id) + '</span>',
						'<span class="paper-card__tag">' + escapeHtml(posterTag) + '</span>',
						spotlightTag,
					'</div>',
					'<h3>' + escapeHtml(paper.title) + '</h3>',
					'<p class="paper-card__authors">' + renderAuthors(paper.authors) + '</p>',
					'<p class="paper-card__teaser paper-card__abstract-text"><span class="paper-card__teaser-start">' + escapeHtml(abstractParts.teaser) + '</span><span class="paper-card__ellipsis">' + (abstractParts.remainder ? "..." : "") + '</span><span class="paper-card__remainder">' + (abstractParts.remainder ? " " + escapeHtml(abstractParts.remainder) : "") + '</span></p>',
					toggle,
					'<div class="paper-card__actions">',
						'<a class="button small primary icon solid fa-download" href="' + escapeHtml(paper.pdf) + '" download>PDF</a>',
					'</div>',
				'</article>'
			].join("");
		}).join("");
	}

	function setAbstractHeight(card, expanded) {
		var abstract = card.querySelector(".paper-card__abstract-text");

		if (!abstract) return;

		if (expanded) {
			card.classList.add("is-expanded");
			window.requestAnimationFrame(function () {
				abstract.style.maxHeight = abstract.scrollHeight + "px";
			});
			return;
		}

		abstract.style.maxHeight = abstract.scrollHeight + "px";

		window.requestAnimationFrame(function () {
			card.classList.remove("is-expanded");
			abstract.style.maxHeight = abstract.dataset.collapsedHeight + "px";
		});
	}

	function setInitialAbstractHeight(abstract) {
		var ellipsis = abstract.querySelector(".paper-card__ellipsis");
		var remainder = abstract.querySelector(".paper-card__remainder");
		var collapsedHeight;

		if (ellipsis) ellipsis.style.display = "inline";
		if (remainder) remainder.style.display = "none";
		collapsedHeight = abstract.scrollHeight;
		if (remainder) remainder.style.display = "";
		if (ellipsis) ellipsis.style.display = "";

		abstract.dataset.collapsedHeight = collapsedHeight;
		abstract.style.maxHeight = collapsedHeight + "px";
	}

	function setInitialAbstractHeights() {
		document.querySelectorAll(".paper-card__abstract-text").forEach(setInitialAbstractHeight);
	}

	function initPaperExplorer() {
		var search = document.getElementById("paper-search");
		var target = document.getElementById("paper-explorer");

		renderPapers(acceptedPapers);
		setInitialAbstractHeights();

		if (!search) return;

		search.addEventListener("input", function () {
			var query = search.value.trim().toLowerCase();
			var filtered = query ? acceptedPapers.filter(function (paper) {
				return paperMatches(paper, query);
			}) : acceptedPapers;

			renderPapers(filtered);
			setInitialAbstractHeights();
		});

		if (!target) return;

		target.addEventListener("click", function (event) {
			var toggle = event.target.closest(".paper-card__toggle");
			var card;
			var expanded;

			if (!toggle) return;

			card = toggle.closest(".paper-card");
			expanded = !card.classList.contains("is-expanded");
			setAbstractHeight(card, expanded);
			toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
			toggle.textContent = expanded ? "Read less" : "Read more";
		});

		window.addEventListener("resize", function () {
			document.querySelectorAll(".paper-card").forEach(function (card) {
				var abstract = card.querySelector(".paper-card__abstract-text");

				if (!abstract) return;

				if (card.classList.contains("is-expanded")) {
					abstract.style.maxHeight = abstract.scrollHeight + "px";
				} else {
					abstract.style.maxHeight = "";
					setInitialAbstractHeight(abstract);
				}
			});
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initPaperExplorer);
	} else {
		initPaperExplorer();
	}
})();
