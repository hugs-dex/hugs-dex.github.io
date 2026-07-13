# Repository Instructions

This repository hosts a static project page for the CoRL paper **HUGS: Guiding Unified Dexterous Grasp Synthesis Across Modes and Scales via Learned Human Priors**.

These instructions apply to the entire repository.

## Project Goal

- Build and maintain a polished static paper homepage for GitHub Pages.
- Keep the page focused on the paper: title, teaser, abstract, method overview, video, synthesized grasps, quantitative results, resources, and citation.
- Prefer clear scientific communication over marketing copy.

## Site Structure

- `index.html` is the main page.
- `assets/css/style.css` contains site styling.
- `assets/js/main.js` contains lightweight page behavior.
- `figures/` contains page figures and converted figure assets.
- `videos/` contains project videos.
- `paper/` contains the paper PDF.

Do not introduce a build system unless explicitly requested. The site should remain directly usable as static HTML/CSS/JS.

## Agent Working Materials

The `.agents/` directory contains internal planning references for the HUGS blog. It is not a source of paper facts unless the user has explicitly supplied that fact there.

- `.agents/blog_reference_grounding.md` — Narrative, evidence-ordering, terminology, and page-UX guidance distilled from reference blogs. Read this before drafting or implementing a HUGS blog page, and use it when evaluating blog structure, media placement, claims, and responsive reading flow. Do not use it as evidence for paper results, numbers, or limitations.
- `.agents/hugs_blog_outline_zh.md` — The working Chinese outline for the HUGS blog. Use it when revising the HUGS blog narrative, section order, or planned supporting media. Treat it as a living planning document: factual claims included in the eventual page must still be checked against the paper PDF or user-provided source material.

When a task concerns the HUGS blog, consult `blog_reference_grounding.md` first, then use `hugs_blog_outline_zh.md` for the current content structure.

- Write all published HUGS blog content in English. The Chinese outline is a planning reference for structure and intent, not the publication language.

## Content Rules

- Do not invent paper claims, numbers, author names, links, or results.
- When adding factual paper content, derive it from the paper PDF or user-provided text/assets.
- Keep anonymous-submission metadata unless the user explicitly provides final author and affiliation information.
- Preserve technical terms consistently:
  - `HUGS`
  - `Human-prior-guided`
  - `Unified dexterous Grasp Synthesis`
  - `object-conditioned human prior`
  - `contact modes`
  - `wrist initializations`
  - `force-closure-aware optimization`
- Do not use `multi-modal` for this project. Use `multi-mode` instead.
- Claims about success rates, dataset size, number of scenes, object scale ranges, and robot hands must match the paper or user-provided corrections.

## Visual And UX Guidelines

- Follow the existing project-page style in `assets/css/style.css`.
- Use section cards, uppercase eyebrow headings, restrained colors, and readable scientific layout.
- Avoid decorative redesigns that distract from figures, videos, and results.
- Keep figures large enough to inspect.
- Prefer concise explanatory paragraphs under figures instead of dense paper-style captions when writing for the webpage.
- Do not add borders around figure images unless needed for readability; many paper figures already have enough visual structure.
- Ensure mobile layouts remain single-column and readable.

## Asset Handling

- Use existing assets when available instead of recreating them.
- Convert PDF figures to PNG when needed for browser-friendly display.
- Recommended conversion command pattern:

```powershell
pdftoppm -png -r 220 -singlefile input.pdf output_without_extension
```

- Keep source PDFs if they are user-provided figure assets.
- Remove temporary render/crop files that are not referenced by the site.
- Do not overwrite user-provided source assets unless explicitly asked.

## Editing Constraints

- Keep changes scoped to the requested page/content update.
- Avoid unrelated refactors, formatting churn, or redesigns.
- Do not delete existing files unless they are clearly temporary files created during the current task.
- Prefer editing with patches.
- Keep HTML semantic and accessible:
  - meaningful `alt` text for images
  - section `aria-label`s where useful
  - descriptive link text

## Verification

Before finishing a change:

- Check that all referenced images, videos, PDFs, CSS, and JS paths exist.
- Search for stale references after renaming or moving assets.
- If adding responsive layout changes, ensure CSS includes a mobile fallback where needed.
- Run `git status --short` and mention any unrelated existing untracked files only if relevant.

## Current Page Notes

- The teaser image is `figures/teaser.png`.
- The overview video is `videos/whole_video_v2.mp4`.
- The method overview image is `figures/overview.png`.
- Synthesized grasp figures are:
  - `figures/synthesis_shadow.png`
  - `figures/synthesis_leap.png`
- Quantitative result figures are generated from:
  - `figures/object_scale_synthesis_success_diversity_combined.pdf`
  - `figures/shadow_robot_type_object_scale_success_combined.pdf`
