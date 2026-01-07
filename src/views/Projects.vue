<template>
  <div class="projects">
    <v-card
      v-for="project in projects"
      :prepend-avatar="getProjectImage(project.id)"
      :title="project.title"
      :subtitle="project.technologies.split('|').join(', ')"
      :key="project.id"
      class="mx-auto"
      :to="`/project/${project.id}`"
    >
      <v-card-text v-if="$te(`projects.${project.id}.description`)">
        <div
          class="ellipsis-multiline"
          v-html="$t(`projects.${project.id}.description`)"
        ></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PROJECTS } from "../constants";

const projectImages = import.meta.glob("../assets/projects/*/*.png", {
  eager: true,
  as: "url",
});

export default defineComponent({
  name: "Projects",
  data() {
    return {
      projects: PROJECTS,
    };
  },
  methods: {
    getProjectImage(id: string) {
      const key = `../assets/projects/${id}/1.png`;
      return projectImages[key] || "";
    },
  },
});
</script>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.projects > * {
  width: 100%;
}

.ellipsis-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
