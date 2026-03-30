<template>
  <div class="home">
    <!-- ── Hero ────────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-text">
        <div v-if="AVAILABLE" class="avail-badge">
          <span class="avail-dot" />
          {{ $t("about.available") }}
        </div>
        <p class="hero-greeting"><span class="prompt">&gt;</span> Hi, I'm</p>
        <h1 class="hero-name">Pierre Nicolas.</h1>
        <h2 class="hero-role">{{ $t("job") }}</h2>
        <p class="hero-bio">{{ $t("about.bio") }}</p>
        <p class="hero-current">
          <v-icon size="14" class="me-1">mdi-briefcase-outline</v-icon>
          {{ $t("about.current") }}
        </p>
        <button class="cv-btn" @click="downloadPdf">
          <v-icon size="16" class="me-1">mdi-download</v-icon>
          {{ $t("downloadcv") }}
        </button>
      </div>

      <div class="hero-photo">
        <div class="photo-frame">
          <v-avatar :size="heroAvatarSize" class="photo-avatar">
            <v-img src="/assets/profile.jpg" alt="Pierre Nicolas" cover />
          </v-avatar>
        </div>
      </div>
    </section>

    <!-- ── Stats strip ──────────────────────────────────────────────── -->
    <div class="stats-strip" v-reveal>
      <div v-for="stat in stats" :key="stat.num" class="stat-item">
        <span class="stat-num">{{ stat.num }}</span>
        <span class="stat-label">{{ $t(stat.label) }}</span>
      </div>
    </div>

    <!-- ── Experience ───────────────────────────────────────────────── -->
    <section class="cv-section">
      <p class="section-label" v-reveal>
        <span class="section-num">01.</span> {{ $t("about.experience") }}
      </p>

      <div class="timeline">
        <div
          v-for="(xp, i) in EXPERIENCE"
          :key="i"
          class="timeline-item"
          v-reveal="{ delay: i * 0.12 + 's' }"
        >
          <div class="timeline-dot" />
          <div class="timeline-body">
            <div class="xp-header">
              <div class="xp-left">
                <h3 class="xp-role">{{ xp.role[locale as "fr" | "en"] }}</h3>
                <p class="xp-company">
                  <span class="xp-company-name">{{ xp.company }}</span>
                  <span class="xp-sep">·</span>
                  <span class="xp-location">{{ xp.location }}</span>
                </p>
              </div>
              <span class="xp-period">{{
                xp.period[locale as "fr" | "en"]
              }}</span>
            </div>
            <p class="xp-summary">{{ xp.summary[locale as "fr" | "en"] }}</p>
            <ul class="xp-bullets">
              <li v-for="(bullet, j) in xp.bullets" :key="j" class="xp-bullet">
                {{ bullet[locale as "fr" | "en"] }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Education -->
        <div
          v-for="(edu, i) in EDUCATION"
          :key="'edu-' + i"
          class="timeline-item"
          v-reveal="{ delay: (EXPERIENCE.length + i) * 0.12 + 's' }"
        >
          <div class="timeline-dot timeline-dot--edu" />
          <div class="timeline-body">
            <div class="xp-header">
              <div class="xp-left">
                <h3 class="xp-role">
                  {{ edu.degree[locale as "fr" | "en"] }}
                </h3>
                <p class="xp-company">
                  <span class="xp-company-name">{{ edu.school }}</span>
                  <span class="xp-sep">·</span>
                  <span class="xp-location">{{ edu.location }}</span>
                </p>
              </div>
              <span class="xp-period">{{ edu.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Featured Projects ────────────────────────────────────────── -->
    <section class="cv-section">
      <div class="section-header-row" v-reveal>
        <p class="section-label">
          <span class="section-num">02.</span> {{ $t("about.featured") }}
        </p>
        <router-link to="/projects" class="see-all-link">
          {{ $t("about.seeall") }}
          <v-icon size="14">mdi-arrow-right</v-icon>
        </router-link>
      </div>

      <div class="featured-grid">
        <router-link
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          :to="`/project/${project.id}`"
          class="project-card"
          v-reveal="{ delay: i * 0.1 + 's' }"
        >
          <div class="card-image-wrap">
            <img
              v-if="getProjectImage(project.id)"
              :src="getProjectImage(project.id)"
              :alt="project.title"
              class="card-image"
            />
            <div v-else class="card-image-placeholder">
              <v-icon size="32" color="primary">mdi-code-braces</v-icon>
            </div>
            <div class="card-overlay" />
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ project.title }}</h3>
            <div class="card-techs">
              <span
                v-for="tech in project.technologies.slice(0, 4)"
                :key="tech"
                class="tech-tag"
                >{{ tech }}</span
              >
              <span
                v-if="project.technologies.length > 4"
                class="tech-tag tech-more"
                >+{{ project.technologies.length - 4 }}</span
              >
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- ── Skills ──────────────────────────────────────────────────── -->
    <section class="cv-section">
      <p class="section-label" v-reveal>
        <span class="section-num">03.</span> {{ $t("about.skills") }}
      </p>
      <div class="skills-grid" v-reveal="{ delay: '0.1s' }">
        <span v-for="skill in skills" :key="skill" class="skill-badge">
          {{ skill }}
        </span>
      </div>
    </section>
  </div>

  <div class="cv-hidden" ref="contentRef">
    <div v-html="renderedMarkdown" class="markdown-content" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { Marked } from "marked";

import { PROJECTS } from "../constants";
import { EXPERIENCE, EDUCATION, AVAILABLE } from "../constants/cv";
import { generateCvMarkdown } from "../helpers/generateCvMarkdown";

const { locale } = useI18n();
const display = useDisplay();
const contentRef = ref<HTMLElement | null>(null);

const heroAvatarSize = computed(() => (display.smAndDown.value ? 140 : 200));

const featuredProjects = computed(() => PROJECTS.slice(0, 3));

const projectImages = import.meta.glob("../assets/projects/*/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

function getProjectImage(id: string): string {
  const key = `../assets/projects/${id}/1.png`;
  return (projectImages[key] as string) || "";
}

const stats = [
  { num: "7+", label: "stats.years" },
  { num: "2", label: "stats.companies" },
  { num: "19+", label: "stats.projects" },
  { num: "10+", label: "stats.technologies" },
];

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue.js",
  "Node.js",
  "GraphQL",
  "Fastify",
  "HTML5",
  "CSS3",
];

const md = new Marked({ async: false, breaks: true });

const renderedMarkdown = computed(
  () => md.parse(generateCvMarkdown(locale.value as "fr" | "en")) as string,
);

const downloadPdf = async () => {
  const el = contentRef.value;
  if (!el) return;

  const html2pdf = (await import("html2pdf.js")).default;

  el.style.position = "static";
  el.style.left = "auto";

  await new Promise<void>((resolve) => {
    html2pdf()
      .set({
        filename:
          locale.value === "fr"
            ? "CV-Pierre-Nicolas.pdf"
            : "CV-Pierre-Nicolas-EN.pdf",
        margin: 10,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4" },
      })
      .from(el)
      .save()
      .then(resolve);
  });

  el.style.position = "fixed";
  el.style.left = "-9999px";
};

defineExpose({ downloadPdf });
</script>

<style scoped>
/* ── Page ─────────────────────────────────────────────────────── */
.home {
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Hero ─────────────────────────────────────────────────────── */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  min-height: 72vh;
  padding-bottom: 4rem;
}

.hero-text {
  flex: 1;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Availability badge ───────────────────────────────────────── */
.avail-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  color: #64ffda;
  background: rgba(100, 255, 218, 0.06);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 100px;
  padding: 5px 14px 5px 10px;
  align-self: flex-start;
}

.avail-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #64ffda;
  flex-shrink: 0;
  animation: pulse-dot 2.2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(100, 255, 218, 0.5);
  }
  50% {
    opacity: 0.75;
    box-shadow: 0 0 0 5px rgba(100, 255, 218, 0);
  }
}

.hero-greeting {
  font-family: "JetBrains Mono", monospace;
  font-size: 1rem;
  color: #64ffda;
  margin: 0;
}

.prompt {
  opacity: 0.5;
  margin-right: 6px;
}

.hero-name {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: #ccd6f6;
  line-height: 1.05;
  margin: 0;
  letter-spacing: -0.03em;
}

.hero-role {
  font-size: clamp(1.4rem, 3.5vw, 2.4rem);
  font-weight: 600;
  color: #8892b0;
  margin: 0;
  letter-spacing: -0.01em;
}

.hero-bio {
  font-size: 1rem;
  line-height: 1.85;
  color: #8892b0;
  margin: 0.25rem 0 0;
  max-width: 52ch;
}

.hero-current {
  display: flex;
  align-items: center;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.82rem;
  color: #64ffda;
  margin: 0;
}

.cv-btn {
  align-self: flex-start;
  margin-top: 0.25rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: #64ffda;
  background: transparent;
  border: 1px solid rgba(100, 255, 218, 0.4);
  border-radius: 6px;
  padding: 10px 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.cv-btn:hover {
  background: rgba(100, 255, 218, 0.08);
  border-color: rgba(100, 255, 218, 0.8);
}

/* ── Photo ────────────────────────────────────────────────────── */
.hero-photo {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.photo-frame {
  position: relative;
  display: inline-block;
}

.photo-avatar {
  position: relative;
  z-index: 1;
  border: 2px solid rgba(100, 255, 218, 0.25);
  transition: border-color 0.3s;
}

.photo-frame::after {
  content: "";
  position: absolute;
  top: 18px;
  left: 18px;
  width: 100%;
  height: 100%;
  border: 2px solid #64ffda;
  border-radius: 50%;
  z-index: 0;
  transition: transform 0.3s ease;
  opacity: 0.6;
}

.photo-frame:hover::after {
  transform: translate(-6px, -6px);
  opacity: 1;
}

.photo-frame:hover .photo-avatar {
  border-color: rgba(100, 255, 218, 0.6);
}

/* ── Stats strip ──────────────────────────────────────────────── */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgba(100, 255, 218, 0.08);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(100, 255, 218, 0.02);
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 1.5rem 1rem;
  border-right: 1px solid rgba(100, 255, 218, 0.06);
}

.stat-item:last-child {
  border-right: none;
}

.stat-num {
  font-family: "JetBrains Mono", monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #64ffda;
  line-height: 1;
}

.stat-label {
  font-size: 0.72rem;
  color: #8892b0;
  text-align: center;
  line-height: 1.3;
}

/* ── Sections ─────────────────────────────────────────────────── */
.cv-section {
  padding: 3.5rem 0;
  border-top: 1px solid rgba(100, 255, 218, 0.08);
}

.section-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.82rem;
  color: #8892b0;
  margin: 0 0 2rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-num {
  color: #64ffda;
}

.section-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.section-header-row .section-label {
  margin-bottom: 0;
}

.see-all-link {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  color: #64ffda;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.see-all-link:hover {
  opacity: 1;
}

/* ── Timeline ─────────────────────────────────────────────────── */
.timeline {
  position: relative;
  padding-left: 1.75rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 3px;
  top: 10px;
  bottom: 10px;
  width: 1px;
  background: linear-gradient(
    to bottom,
    #64ffda 0%,
    rgba(100, 255, 218, 0.1) 100%
  );
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -1.75rem;
  top: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #64ffda;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.6);
  transform: translateX(calc(-50% + 3.5px));
}

.timeline-dot--edu {
  background: #7c3aed;
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
}

.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.xp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.xp-left {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.xp-role {
  font-size: 1.05rem;
  font-weight: 600;
  color: #ccd6f6;
  margin: 0;
}

.xp-company {
  font-size: 0.85rem;
  color: #8892b0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.xp-company-name {
  color: #64ffda;
  font-weight: 500;
}

.xp-sep {
  opacity: 0.4;
}

.xp-period {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  color: #8892b0;
  white-space: nowrap;
  padding-top: 3px;
}

.xp-summary {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #8892b0;
  margin: 0;
}

.xp-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.xp-bullet {
  font-size: 0.87rem;
  line-height: 1.65;
  color: #6b7794;
  padding-left: 1.1rem;
  position: relative;
}

.xp-bullet::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: #64ffda;
  font-size: 0.7rem;
  top: 3px;
}

/* ── Featured projects ────────────────────────────────────────── */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-card {
  background: #111827;
  border: 1px solid rgba(100, 255, 218, 0.06);
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  transition:
    transform 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(100, 255, 218, 0.25);
  box-shadow: 0 8px 32px rgba(100, 255, 218, 0.07);
}

.card-image-wrap {
  position: relative;
  height: 150px;
  overflow: hidden;
  background: #1a2540;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.project-card:hover .card-image {
  transform: scale(1.04);
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(17, 24, 39, 0.7) 100%
  );
}

.card-body {
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ccd6f6;
  margin: 0;
  line-height: 1.3;
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tech-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.65rem;
  color: #64ffda;
  background: rgba(100, 255, 218, 0.06);
  border: 1px solid rgba(100, 255, 218, 0.14);
  border-radius: 3px;
  padding: 2px 7px;
}

.tech-more {
  color: #8892b0;
  border-color: rgba(136, 146, 176, 0.14);
  background: rgba(136, 146, 176, 0.06);
}

/* ── Skills ───────────────────────────────────────────────────── */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  color: #64ffda;
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  padding: 6px 14px;
  transition:
    background 0.2s,
    border-color 0.2s;
  cursor: default;
}

.skill-badge:hover {
  background: rgba(100, 255, 218, 0.1);
  border-color: rgba(100, 255, 218, 0.5);
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-strip {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-item:nth-child(2) {
    border-right: none;
  }

  .stat-item:nth-child(3) {
    border-top: 1px solid rgba(100, 255, 218, 0.06);
  }

  .stat-item:nth-child(4) {
    border-top: 1px solid rgba(100, 255, 218, 0.06);
  }
}

@media (max-width: 768px) {
  .home {
    padding-top: 2rem;
  }

  .hero {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    gap: 2.5rem;
    min-height: auto;
    padding-bottom: 0;
  }

  .hero-text {
    align-items: center;
  }

  .avail-badge {
    align-self: center;
  }

  .hero-bio {
    text-align: center;
  }

  .hero-current {
    justify-content: center;
  }

  .cv-btn {
    align-self: center;
  }

  .xp-header {
    flex-direction: column;
    gap: 4px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid {
    justify-content: center;
  }
}

/* ── Hidden CV (PDF source) ───────────────────────────────────── */
.cv-hidden {
  position: fixed;
  left: -9999px;
  width: 794px;
  line-height: 1.6;
  background-color: white;
  color: #333;
}

:deep(.markdown-content pre) {
  background: #2d2d2d;
  border-radius: 4px;
  margin: 0.5em 0;
  padding: 1em;
  overflow-x: auto;
}

:deep(.markdown-content code) {
  font-family: "Fira Code", Consolas, Monaco, monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

:deep(.markdown-content :not(pre) > code) {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  color: #e83e8c;
}

:deep(.markdown-content img) {
  max-width: 100%;
}

:deep(.markdown-content table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

:deep(.markdown-content th),
:deep(.markdown-content td) {
  border: 1px solid #ddd;
  padding: 8px;
}

:deep(.markdown-content th) {
  background-color: #f0f0f0;
}

:deep(.markdown-content blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin-left: 0;
  color: #666;
}

:deep(.markdown-content h1) {
  font-size: 2.2em;
  border-bottom: 2px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

:deep(.markdown-content h2) {
  font-size: 1.8em;
  margin: 1.5rem 0;
}

:deep(.markdown-content h3) {
  font-size: 1.4em;
}

:deep(.markdown-content h1),
:deep(.markdown-content h2),
:deep(.markdown-content h3) {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(.markdown-content ul),
:deep(.markdown-content ol) {
  margin: 1em 0;
  padding-left: 2em;
  list-style-position: outside;
  list-style-type: disc;
}

:deep(.markdown-content ol) {
  list-style-type: decimal;
}

:deep(.markdown-content li) {
  margin: 0.25em 0;
}

:deep(.markdown-content hr) {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2em 0;
}
</style>
