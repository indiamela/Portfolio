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
  assert.match(html, /<section class="profile-section"[^>]*>[\s\S]*<section class="service-section" id="service"/);
  assert.match(html, /<h2 id="service-title">SERVICE<\/h2>/);
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
  assert.match(styles, /\.career-list article \{[\s\S]*grid-template-columns: 1fr;/);
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
