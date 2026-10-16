<title>How Usable Are Geospatial Foundation Models? | Portfolio of Artyom Gabtraupov</title>

# Project Overview

**[How Usable Are Geospatial Foundation Models? A Systematic Evaluation of 89 Models](https://arxiv.org/abs/2608.03804v1)** is a human-computer interaction (HCI) research paper I co-authored with researchers at the **University of Cambridge**.

Geospatial foundation models are AI models trained on large amounts of geographic data, often satellite imagery, so they can be adapted to tasks such as environmental monitoring. Research usually compares them on benchmark accuracy. A model can score well on a benchmark and still be very hard for an ecologist to actually use.

We built a framework for evaluating these models from the point of view of the scientists who are meant to use them, and applied it to 89 models.

# The Team

- **Robin Young**, PhD researcher, Department of Computer Science and Technology, University of Cambridge. Robin pioneered and led the research.
- **Artyom Gabtraupov** (me), undergraduate, University of Waterloo.
- **Kenzy Soror**, undergraduate, University of Waterloo. Kenzy and I worked under Robin and are listed as equal contributors.
- **Srinivasan Keshav**, Professor, Department of Computer Science and Technology, University of Cambridge, who supervised the project.

Kenzy and I collaborated with the Cambridge team remotely from Waterloo.

# My Contribution

The paper credits me, equally with Kenzy, with **methodology, investigation, data curation, validation, and reviewing and editing the paper**.

# The Problem

Most evaluations of geospatial foundation models are *model-centric*: they compare architectures and benchmark scores. That leaves out whether an ecologist or conservation scientist, who may not specialize in machine learning, can get the model running, apply it to their own data, and trust the results enough to publish or inform policy.

That gap matters because these are often the people the models are built to help. Earth observation, meaning studying the Earth with satellite and other remote-sensing data, is central to tracking biodiversity loss and climate change.

# Approach

1. **Pilot expert survey.** An anonymous survey of 11 researchers at an international conservation monitoring center, spanning ecology, conservation, earth science, and agriculture, to find mismatches between what these scientists need and what model developers prioritize.
2. **HCI-informed rubric.** Using the survey findings and HCI theory, we defined seven usability dimensions, each with concrete criteria.
3. **Systematic evaluation of 89 models.** Two raters evaluated each model's public paper, code, documentation, and any hosted demos or APIs. Both raters first scored the same 20-model sample to check they agreed (93% agreement), then split the remaining models.

# The Seven Dimensions

<div>
<ol aria-label="The seven usability dimensions used to evaluate geospatial foundation models" style="list-style: none; padding: 0; margin: 1.5rem 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 0.75rem;">
<li class="glass" style="border-radius: 0.875rem; padding: 1rem 1.1rem; margin: 0; line-height: 1.5;"><span style="display: block; color: #86efac; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;">01</span><strong>Access &amp; Deployment</strong><span style="display: block; color: #d1d5db; font-size: 0.95rem; margin-top: 0.35rem;">How hard it is to get the model running for a basic task.</span></li>
<li class="glass" style="border-radius: 0.875rem; padding: 1rem 1.1rem; margin: 0; line-height: 1.5;"><span style="display: block; color: #86efac; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;">02</span><strong>Interaction &amp; Customization</strong><span style="display: block; color: #d1d5db; font-size: 0.95rem; margin-top: 0.35rem;">Whether you can run it on your own data, fine-tune it (retrain it for your task), query it, or extract embeddings (compact numeric summaries of each location).</span></li>
<li class="glass" style="border-radius: 0.875rem; padding: 1rem 1.1rem; margin: 0; line-height: 1.5;"><span style="display: block; color: #86efac; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;">03</span><strong>Trust &amp; Transparency</strong><span style="display: block; color: #d1d5db; font-size: 0.95rem; margin-top: 0.35rem;">Reproducible benchmarks, explanations of model outputs, uncertainty estimates (how confident the model is), and interactive validation.</span></li>
<li class="glass" style="border-radius: 0.875rem; padding: 1rem 1.1rem; margin: 0; line-height: 1.5;"><span style="display: block; color: #86efac; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;">04</span><strong>Community &amp; Support</strong><span style="display: block; color: #d1d5db; font-size: 0.95rem; margin-top: 0.35rem;">Documentation, tutorials, and community help when you get stuck.</span></li>
<li class="glass" style="border-radius: 0.875rem; padding: 1rem 1.1rem; margin: 0; line-height: 1.5;"><span style="display: block; color: #86efac; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;">05</span><strong>Scientific Permanence &amp; Reproducibility</strong><span style="display: block; color: #d1d5db; font-size: 0.95rem; margin-top: 0.35rem;">Openness, long-term archiving, and exporting results in reusable formats.</span></li>
<li class="glass" style="border-radius: 0.875rem; padding: 1rem 1.1rem; margin: 0; line-height: 1.5;"><span style="display: block; color: #86efac; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;">06</span><strong>Multilingual Support</strong><span style="display: block; color: #d1d5db; font-size: 0.95rem; margin-top: 0.35rem;">Maintained documentation and interfaces in more than one language.</span></li>
<li class="glass" style="border-radius: 0.875rem; padding: 1rem 1.1rem; margin: 0; line-height: 1.5;"><span style="display: block; color: #86efac; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;">07</span><strong>Offline Usability</strong><span style="display: block; color: #d1d5db; font-size: 0.95rem; margin-top: 0.35rem;">Whether meaningful work can continue with limited internet access.</span></li>
</ol>
</div>

# Key Findings

- **Nearly a third of the models provide no support to practitioners beyond their source code.**
- **Over half are inaccessible without significant machine learning expertise.**
- **No model documented uncertainty quantification.** Of the 63 models accessible enough to evaluate in depth, nearly all (96.8%) provide reproducible benchmarks, but none documents how confident it is in its outputs. Uncertainty visualization was the trust feature our survey respondents most often prioritized.
- **The most common way to adapt a model, fine-tuning, also requires the deepest technical knowledge.**
- Some dimensions clearly separate more usable models from less usable ones. Others, where nearly every model scored the same, point to gaps across the whole field.

# Why It Matters

The framework shifts the question from *"How well does the model perform?"* to *"Can the scientist it was built for actually use it?"* It gives researchers and practitioners a structured way to compare models for real-world scientific work, and shows developers where the barriers to adoption are.

The paper is open about its limits. The survey was a small pilot (11 participants) from a single institutional context. The ratings are a snapshot from October 2025 to January 2026, based only on what each model publicly documented. Future work includes validating the framework with task-based user studies.

# Read the Paper

[Read "How Usable Are Geospatial Foundation Models?" on arXiv](https://arxiv.org/abs/2608.03804v1)
