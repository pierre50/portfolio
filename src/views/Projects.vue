<template>
  <div class="projects">
    <v-card
      v-for="project in projects"
      :key="project.id"
      class="mx-auto"
      style="max-width: 300px; margin: 15px 0"
      width="300"
      :to="`/project/${project.id}`"
    >
      <v-img
        height="200px"
        gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
        cover
        :src="getProjectImage(project.id)"
      >
        <v-card-title class="text-white">{{ project.title }}</v-card-title>
      </v-img>
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
  flex-wrap: wrap;
  gap: 10px;
}
</style>
