<template>
  <div v-if="project" class="project-page">
    <nav class="project-nav" v-reveal>
      <router-link to="/projects" class="back-link">
        <v-icon size="15">mdi-arrow-left</v-icon>
        {{ $t("project.goback") }}
      </router-link>
      <div class="nav-arrows">
        <router-link
          :to="previousHref"
          class="arrow-link"
          :class="{ disabled: !previous }"
        >
          <v-icon size="16">mdi-arrow-left</v-icon>
          {{ $t("project.previous") }}
        </router-link>
        <router-link
          :to="nextHref"
          class="arrow-link"
          :class="{ disabled: !next }"
        >
          {{ $t("project.next") }}
          <v-icon size="16">mdi-arrow-right</v-icon>
        </router-link>
      </div>
    </nav>

    <!-- ── Content ──────────────────────────────────────────────────── -->
    <div class="project-layout">
      <!-- Media -->
      <div class="project-media" v-reveal>
        <div v-if="project.preview" class="preview-wrap">
          <iframe
            width="100%"
            height="460"
            :src="project.preview"
            class="preview-frame"
          />
        </div>
        <div v-if="images.length" class="gallery-wrap">
          <galery :images="images" />
        </div>
      </div>

      <!-- Info sidebar -->
      <aside class="project-info" v-reveal="{ delay: '0.1s' }">
        <h1 class="project-title">{{ project.title }}</h1>

        <div class="meta-list">
          <div v-if="project.type" class="meta-row">
            <span class="meta-key">{{ $t("project.type.default") }}</span>
            <span class="meta-val">{{
              $t(`project.type.${project.type}`)
            }}</span>
          </div>
          <div v-if="project.year" class="meta-row">
            <span class="meta-key">{{ $t("project.year") }}</span>
            <span class="meta-val">{{ project.year }}</span>
          </div>
          <div v-if="projectLength" class="meta-row">
            <span class="meta-key">{{ $t("project.length") }}</span>
            <span class="meta-val">{{ projectLength }}</span>
          </div>
          <div v-if="project.status" class="meta-row">
            <span class="meta-key">{{ $t("project.status.default") }}</span>
            <span class="meta-val status-badge" :class="project.status">{{
              $t(`project.status.${project.status}`)
            }}</span>
          </div>
        </div>

        <div v-if="project.technologies.length" class="info-block">
          <span class="block-label">{{ $t("project.technologies") }}</span>
          <div class="tech-tags">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="tech-tag"
              >{{ tech }}</span
            >
          </div>
        </div>

        <div v-if="project.links?.length" class="info-block">
          <span class="block-label">{{ $t("project.link") }}</span>
          <div class="project-links">
            <a
              v-for="link in project.links"
              :key="link"
              :href="link"
              target="_blank"
              class="project-link"
            >
              <v-icon size="13">mdi-open-in-new</v-icon>
              {{ link }}
            </a>
          </div>
        </div>

        <div
          v-if="$te(`projects.${project.id}.description`)"
          class="project-desc"
          v-html="$t(`projects.${project.id}.description`)"
        />
      </aside>
    </div>
  </div>

  <div v-else class="not-found">
    <span>{{ $t("project.notfound") }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { PROJECTS, type Project } from "../constants";
import Galery from "../components/Galery.vue";

const route = useRoute();
const { locale } = useI18n();

const projectImages = import.meta.glob("../assets/projects/*/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const index = computed(() =>
  PROJECTS.findIndex((p) => p.id === route.params.id),
);
const project = computed<Project | null>(() => PROJECTS[index.value] ?? null);
const previous = computed<Project | null>(
  () => PROJECTS[index.value - 1] ?? null,
);
const next = computed<Project | null>(() => PROJECTS[index.value + 1] ?? null);

const previousHref = computed(() =>
  previous.value ? `/project/${previous.value.id}` : "#",
);
const nextHref = computed(() =>
  next.value ? `/project/${next.value.id}` : "#",
);

const images = computed(() => {
  if (!project.value) return [];
  const imgs: string[] = [];
  for (let i = 1; i <= project.value.image_count; i++) {
    const key = `../assets/projects/${project.value.id}/${i}.png`;
    if (projectImages[key]) imgs.push(projectImages[key] as string);
  }
  return imgs;
});

const projectLength = computed(() => {
  const len = project.value?.length;
  if (!len) return null;
  return typeof len === "object" ? len[locale.value as "fr" | "en"] : len;
});
</script>

<style scoped>
.project-page {
  padding-top: 2rem;
}

/* ── Nav ──────────────────────────────────────────────────────── */
.project-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(100, 255, 218, 0.08);
}

.back-link {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  color: #64ffda;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.7;
}

.nav-arrows {
  display: flex;
  gap: 16px;
}

.arrow-link {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  color: #8892b0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
}

.arrow-link:hover:not(.disabled) {
  color: #64ffda;
}

.arrow-link.disabled {
  opacity: 0.3;
  pointer-events: none;
}

/* ── Layout ───────────────────────────────────────────────────── */
.project-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2.5rem;
  align-items: start;
}

/* ── Media ────────────────────────────────────────────────────── */
.preview-frame {
  border: none;
  border-radius: 8px;
  background: #111827;
  width: 100%;
}

.gallery-wrap {
  margin-top: 1rem;
}

/* ── Info sidebar ─────────────────────────────────────────────── */
.project-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ccd6f6;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

/* ── Meta table ───────────────────────────────────────────────── */
.meta-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #111827;
  border: 1px solid rgba(100, 255, 218, 0.06);
  border-radius: 8px;
  padding: 16px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.meta-key {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  color: #8892b0;
  white-space: nowrap;
}

.meta-val {
  font-size: 0.85rem;
  color: #ccd6f6;
  text-align: right;
}

.status-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.68rem;
  padding: 2px 9px;
  border-radius: 4px;
}

.status-badge.finished {
  color: #64ffda;
  background: rgba(100, 255, 218, 0.1);
}

.status-badge.inprogress {
  color: #ffd166;
  background: rgba(255, 209, 102, 0.1);
}

.status-badge.aborted {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
}

/* ── Info blocks ──────────────────────────────────────────────── */
.info-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.block-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  color: #8892b0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  color: #64ffda;
  background: rgba(100, 255, 218, 0.06);
  border: 1px solid rgba(100, 255, 218, 0.14);
  border-radius: 3px;
  padding: 3px 10px;
}

.project-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.project-link {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  color: #64ffda;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.project-link:hover {
  opacity: 1;
}

/* ── Description ──────────────────────────────────────────────── */
.project-desc {
  font-size: 0.9rem;
  line-height: 1.85;
  color: #8892b0;
  border-top: 1px solid rgba(100, 255, 218, 0.08);
  padding-top: 1.5rem;
}

:deep(.project-desc p) {
  margin: 0 0 1em;
}

:deep(.project-desc a) {
  color: #64ffda;
  text-decoration: none;
}

:deep(.project-desc a:hover) {
  text-decoration: underline;
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .project-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .project-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

.not-found {
  text-align: center;
  padding: 4rem;
  color: #8892b0;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
}
</style>
