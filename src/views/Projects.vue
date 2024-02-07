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
      <v-img height="200px" gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)"
      cover :src="getProjectImage(project.id)"> 
        <v-card-title class="text-white" >{{ project.title }}</v-card-title>
      </v-img>
    </v-card>
  </div>
</template>

<script>
import { projects } from '../constants'

export default {
  name: "Projects",
  data() {
    return {
      projects,
    };
  },
  methods: {
    getProjectImage(id) {
      return require(`@/assets/projects/${id}/1.png`);
    },
  },
};
</script>
<style scoped>
.projects {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>