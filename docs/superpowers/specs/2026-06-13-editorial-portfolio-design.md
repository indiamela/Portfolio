# Editorial Portfolio Design

## Goal

Build the approved B concept as a static portfolio site for Taishi Kusunose: editorial, refined, monochrome, and focused on iOS app engineering credibility.

## Design System

- Typography: serif-led editorial hierarchy using Japanese Mincho fallbacks for headings and restrained sans-serif for navigation/body utility text.
- Palette: true white background, black ink text, warm gray borders, muted secondary text, and a very small dark red accent for focus states.
- Layout: first viewport uses a newspaper-like grid with a giant title, profile photo, compact career timeline, and selected works preview below the fold.
- Components: text buttons with arrow marks, ruled work rows, timeline entries, skill panels, and career rows.

## Content

- Source: Notion page `Portfolio - Taishi Kusunose -`, fetched on 2026-06-13.
- Hero: Mobile App Engineer, 楠瀬 大志, Swift / SwiftUI positioning.
- Work rows: 東京都公式アプリ, PIVOT, Classi, L.B.B Register.
- Sections: Works, Profile, Languages / Tools, My Strengths, Career, Other, Contact.

## Implementation

Use a dependency-free static site:

- `index.html`: semantic content and section structure.
- `styles.css`: editorial/refined visual system and responsive layout.
- `script.js`: small progressive enhancement for active navigation and reveal motion.
- `assets/profile.jpg`: local copy of the Notion profile image so published deployments do not depend on expiring Notion file URLs.

## Acceptance Criteria

- Desktop first viewport visually follows the approved B concept: large serif title, portrait at right, center timeline, horizontal rules, and selected works preview.
- Mobile layout preserves content order and avoids horizontal overflow.
- Navigation anchors work for Works, Languages / Tools, Career, and Contact.
- Profile image is loaded from local project assets.
- The page can be opened directly as static HTML or served from any static host.
