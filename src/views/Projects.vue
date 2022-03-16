<template>
  <div class="projects">
    <v-card
      v-for="project in projects"
      :key="project.id"
      class="mx-auto"
      style="max-width: 300px; margin: 15px 0"
      max-width="300"
      :to="`/project/${project.id}`"
    >
      <v-img height="200px" :src="getProjectImage(project.id)"> </v-img>
      <v-card-subtitle>{{ project.title }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {
      projects: this.store.projects,
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
}
</style>