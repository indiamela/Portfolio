import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const script = readFileSync(new URL("../script.js", import.meta.url), "utf8");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

const expectedServices = [
  "モバイルアプリ開発",
  "開発マネジメント支援",
  "AI開発支援",
];

test("Service section appears below Profile with three service pillars", () => {
  assert.match(html, /<section class="profile-section"[^>]*>[\s\S]*<section class="service-section" id="service" aria-label="Service">/);
  assert.doesNotMatch(html, /<h2 id="service-title">SERVICE<\/h2>/);
  assert.match(html, /<p class="section-label">Service<\/p>/);
  assert.match(html, /UI\/UXデザインの改善提案/);
  assert.match(html, /Claude CodeやCodex/);

  const serviceCardCount = (html.match(/<div class="service-grid">[\s\S]*?<\/div>/)?.[0].match(/<article>/g) ?? []).length;
  assert.equal(serviceCardCount, expectedServices.length);

  const serviceIconCount = (html.match(/class="service-icon"/g) ?? []).length;
  assert.equal(serviceIconCount, expectedServices.length);
  assert.match(html, /<h3>モバイルアプリ開発<\/h3>\s*<svg class="service-icon"[\s\S]*?<p>/);

  for (const serviceTitle of expectedServices) {
    assert.match(html, new RegExp(serviceTitle));
  }
});

test("WORKS section and navigation are removed", () => {
  assert.doesNotMatch(html, /<section class="works-section"/);
  assert.doesNotMatch(html, /id="works"/);
  assert.doesNotMatch(html, /<h2 id="works-title">WORKS<\/h2>/);
  assert.doesNotMatch(html, /href="#works"/);
  assert.doesNotMatch(html, /<details class="work-card"/);
});

test("service cards are included in reveal animation targets", () => {
  assert.doesNotMatch(script, /\.work-card/);
  assert.doesNotMatch(script, /\.strength-columns article/);
  assert.doesNotMatch(script, /\.other-grid article/);
  assert.match(script, /\.service-grid article/);
});

test("service card labels, titles, and icons are centered", () => {
  assert.match(styles, /\.service-grid article \{[\s\S]*justify-items: center;/);
  assert.match(styles, /\.service-grid span \{[\s\S]*text-align: center;/);
  assert.match(styles, /\.service-grid h3 \{[\s\S]*text-align: center;/);
  assert.match(styles, /\.service-grid p \{[\s\S]*text-align: left;/);
});

test("skill table omits Years column", () => {
  assert.doesNotMatch(html, /<span role="columnheader">Years<\/span>/);
  assert.doesNotMatch(html, /<span role="cell">[0-9] - [0-9]年<\/span>/);
  assert.match(styles, /grid-template-columns: minmax\(140px, 0\.28fr\) 1fr;/);
});

test("career entries omit date column and align content left", () => {
  assert.doesNotMatch(html, /<time>/);
  assert.doesNotMatch(html, /2026\.02 - 現在/);
  assert.match(html, /<section class="career-section" id="career" aria-label="Career">/);
  assert.doesNotMatch(html, /<h2 id="career-title">プロダクトの節目で、手を動かして前に進める。<\/h2>/);
  assert.match(html, /<p class="section-label">Career<\/p>/);
  assert.match(styles, /\.career-list article \{[\s\S]*grid-template-columns: 68px 1fr;/);
  assert.match(styles, /@media \(max-width: 820px\) \{[\s\S]*\.career-list article \{[\s\S]*grid-template-columns: 1fr;/);
});

test("career company names link to their company websites", () => {
  const expectedCompanyLinks = [
    ["PIVOT株式会社", "https://pivot.inc/"],
    ["Classi株式会社", "https://classi.jp/"],
    ["株式会社LBB", "https://lbb.co.jp/"],
  ];

  for (const [companyName, href] of expectedCompanyLinks) {
    assert.match(
      html,
      new RegExp(`<h3><a href="${href}" target="_blank" rel="noopener noreferrer">${companyName}<\\/a><\\/h3>`)
    );
  }

  assert.match(styles, /\.career-list h3 a \{[\s\S]*text-decoration: underline;/);
});

test("contact button opens a preaddressed email draft", () => {
  assert.match(html, /<a class="button button-dark" href="mailto:taishi\.kusunose@gmail\.com">メールで相談する<\/a>/);
  assert.doesNotMatch(html, /href="mailto:"/);
});

test("iconography adds visual rhythm without changing copy", () => {
  assert.doesNotMatch(html, /hero-proof-list|micro-icon|主要な支援領域/);
  assert.doesNotMatch(html, /<span>SwiftUI実装<\/span>|<span>UX改善<\/span>|<span>AI開発支援<\/span>/);
  assert.equal((html.match(/class="skill-icon"/g) ?? []).length, 4);
  assert.equal((html.match(/class="career-icon"/g) ?? []).length, 4);
  assert.equal((html.match(/class="contact-mark"/g) ?? []).length, 1);
  assert.match(styles, /\.skill-grid article \{[\s\S]*justify-items: center;/);
  assert.match(styles, /\.skill-grid span \{[\s\S]*text-align: center;/);
  assert.match(styles, /\.skill-grid h3 \{[\s\S]*text-align: center;/);
  assert.match(styles, /\.skill-icon \{[\s\S]*color: var\(--ink\);[\s\S]*stroke-linejoin: round;/);
  assert.match(styles, /\.service-icon \{[\s\S]*color: var\(--ink\);[\s\S]*stroke-linejoin: round;/);
  assert.match(styles, /\.career-icon \{[\s\S]*color: var\(--ink\);[\s\S]*stroke-linejoin: round;/);
  assert.match(styles, /\.contact-mark \{[\s\S]*color: var\(--ink\);[\s\S]*stroke-linejoin: round;/);
  assert.doesNotMatch(styles, /\.(?:skill|service|career)-icon \{[^}]*color: var\(--accent\);/);
  assert.doesNotMatch(styles, /\.contact-mark \{[^}]*color: var\(--accent\);/);
  assert.doesNotMatch(styles, /article:nth-child\([^)]*\) \.(?:skill|service|career)-icon/);
  assert.match(styles, /\.contact-copy \{[\s\S]*grid-template-columns: auto minmax\(0, 1fr\);/);
});

test("skills heading uses concise copy", () => {
  assert.match(html, /<h2 id="skills-title">実装からリリース、チーム開発まで。<\/h2>/);
  assert.doesNotMatch(html, /実装からリリース、チーム開発まで扱えるスキルセット。/);
});

test("Strengths and Other sections are removed", () => {
  assert.doesNotMatch(html, /class="strengths-section"/);
  assert.doesNotMatch(html, /id="strengths-title"/);
  assert.doesNotMatch(html, /My Strengths/);
  assert.doesNotMatch(html, /class="other-section"/);
  assert.doesNotMatch(html, /id="other-title"/);
  assert.doesNotMatch(html, /<p class="section-label">Other<\/p>/);
  assert.doesNotMatch(styles, /strengths-section|strength-columns|other-section|other-grid/);
});

test("mobile responsive polish keeps the page compact and readable", () => {
  assert.match(styles, /\.hero h1 \{[\s\S]*font-size: clamp\(48px, 15vw, 60px\);/);
  assert.match(html, /<img src="assets\/taishi-portrait-bw\.jpeg" alt="楠瀬大志のプロフィール写真" width="1536" height="2048" \/>/);
  assert.match(styles, /\.portrait-block \{[\s\S]*width: min\(100%, 420px, 58vh\);[\s\S]*aspect-ratio: 3 \/ 4;[\s\S]*height: auto;/);
  assert.match(styles, /\.site-nav \{[\s\S]*overflow-x: auto;/);
  assert.match(styles, /\.service-grid article \{[\s\S]*min-height: auto;/);
  assert.match(script, /rootMargin: "0px 0px 12% 0px", threshold: 0\.08/);
});
