<template>
  <div class="projects-page">
    <div class="page-header" v-reveal>
      <p class="page-label">
        <span class="label-num">02.</span> {{ $t("menu.projects") }}
      </p>
    </div>

    <div class="filter-bar" v-reveal="{ delay: '0.05s' }">
      <button
        v-for="type in filterTypes"
        :key="type"
        class="filter-btn"
        :class="{ active: activeFilter === type }"
        @click="activeFilter = type"
      >
        {{ $t(`project.type.${type}`) }}
        <span class="filter-count">{{ getCount(type) }}</span>
      </button>
    </div>

    <div class="projects-grid" v-reveal="{ delay: '0.1s' }">
      <router-link
        v-for="project in filtered"
        :key="project.id"
        :to="`/project/${project.id}`"
        class="project-card"
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
            >
              {{ tech }}
            </span>
            <span
              v-if="project.technologies.length > 4"
              class="tech-tag tech-more"
            >
              +{{ project.technologies.length - 4 }}
            </span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { PROJECTS } from "../constants";

const projectImages = import.meta.glob("../assets/projects/*/*.png", {
  eager: true,
  as: "url",
});

const filterTypes = ["all", "saas", "personal", "school"] as const;
type FilterType = (typeof filterTypes)[number];

const activeFilter = ref<FilterType>("all");

const filtered = computed(() =>
  activeFilter.value === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === activeFilter.value),
);

function getCount(type: FilterType) {
  if (type === "all") return PROJECTS.length;
  return PROJECTS.filter((p) => p.type === type).length;
}

function getProjectImage(id: string): string {
  const key = `../assets/projects/${id}/1.png`;
  return (projectImages[key] as string) || "";
}
</script>

<style scoped>
/* ── Page ─────────────────────────────────────────────────────── */
.projects-page {
  padding-top: 2rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.82rem;
  color: #8892b0;
  margin: 0;
}

.label-num {
  color: #64ffda;
}

/* ── Filter bar ───────────────────────────────────────────────── */
.filter-bar {
  display: flex;
  gap: 0;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(100, 255, 218, 0.08);
}

.filter-btn {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  color: #8892b0;
  background: none;
  border: none;
  padding: 10px 18px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition:
    color 0.2s,
    border-color 0.2s;
  display: flex;
  align-items: center;
  gap: 7px;
}

.filter-btn:hover {
  color: #ccd6f6;
}

.filter-btn.active {
  color: #64ffda;
  border-bottom-color: #64ffda;
}

.filter-count {
  font-size: 0.68rem;
  opacity: 0.55;
}

/* ── Grid ─────────────────────────────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

/* ── Card ─────────────────────────────────────────────────────── */
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
  height: 160px;
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
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ccd6f6;
  margin: 0;
  line-height: 1.3;
}

.card-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tech-tag {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.68rem;
  color: #64ffda;
  background: rgba(100, 255, 218, 0.06);
  border: 1px solid rgba(100, 255, 218, 0.14);
  border-radius: 3px;
  padding: 2px 8px;
}

.tech-more {
  color: #8892b0;
  border-color: rgba(136, 146, 176, 0.14);
  background: rgba(136, 146, 176, 0.06);
}
</style>
