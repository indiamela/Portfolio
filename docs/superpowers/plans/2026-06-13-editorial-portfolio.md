# Editorial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Editorial + Refined portfolio concept as a static web page.

**Architecture:** Build a dependency-free static site from Notion content. Keep content in semantic HTML, visual styling in one stylesheet, and minor interaction enhancement in one JavaScript file.

**Tech Stack:** HTML, CSS, JavaScript, local image assets.

---

### Task 1: Static Site Shell

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `assets/profile.jpg`

- [x] **Step 1: Create semantic page content**

Create a full HTML document with header navigation, hero, works, profile, skills, strengths, career, other, and contact sections.

- [x] **Step 2: Add editorial/refined CSS**

Implement the approved B visual system: white background, black serif typography, ruled grid, profile portrait, career timeline, and responsive layouts.

- [x] **Step 3: Add progressive enhancement**

Add smooth anchor state handling and reveal classes with `IntersectionObserver`.

- [x] **Step 4: Store profile image locally**

Download the Notion profile image to `assets/profile.jpg` so the site is deployable without expiring Notion asset URLs.

### Task 2: Verification

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `script.js`
- Verify: `assets/profile.jpg`

- [x] **Step 1: Serve locally**

Run `python3 -m http.server 4173` from the project root and open `http://localhost:4173`.

- [x] **Step 2: Browser-check desktop**

Check first viewport, selected works preview, navigation anchors, portrait loading, and section rhythm.

- [x] **Step 3: Browser-check mobile**

Check a mobile viewport for horizontal overflow, readable headings, image framing, and button sizing.

- [x] **Step 4: Compare against concept**

Inspect the accepted B concept image and the current browser screenshot with `view_image`, then fix visible drift.
