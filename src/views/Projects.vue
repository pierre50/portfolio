<template>
  <div class="projects">
    <v-card
      v-for="project in PROJECTS"
      :key="project.id"
      :to="`/project/${project.id}`"
      class="project-card"
    >
      <v-img :src="getProjectImage(project.id)" height="160" cover />
      <v-card-title class="text-subtitle-1 font-weight-bold pt-3 pb-1">
        {{ project.title }}
      </v-card-title>
      <v-card-text class="pt-0">
        <div class="d-flex flex-wrap gap-1">
          <v-chip
            v-for="tech in project.technologies"
            :key="tech"
            size="x-small"
            color="primary"
            variant="tonal"
          >{{ tech }}</v-chip>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { PROJECTS } from "../constants";

const projectImages = import.meta.glob("../assets/projects/*/*.png", {
  eager: true,
  as: "url",
});

function getProjectImage(id: string): string {
  const key = `../assets/projects/${id}/1.png`;
  return (projectImages[key] as string) || "";
}
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.project-card {
  transition: transform 0.15s ease;
}

.project-card:hover {
  transform: translateY(-3px);
}
</style>
