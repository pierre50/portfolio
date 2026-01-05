<template>
  <div v-if="project">
    <div class="project-content">
      <div v-if="project.type">
        {{ $t("project.type") }}: {{ $t(`project.type.${project.type}`) }}
      </div>
      <div v-if="project.year">
        {{ $t("project.year") }}: {{ project.year }}
      </div>
      <div v-if="project.length">
        {{ $t("project.length") }}:
        {{
          typeof project.length === "object"
            ? project.length[$i18n.locale]
            : project.length
        }}
      </div>
      <div v-if="project.status">
        {{ $t("project.status") }}: {{ $t(`project.status.${project.status}`) }}
      </div>
      <div v-if="technologies.length">
        {{ $t("project.technologies") }}:
        <v-chip
          v-for="technology in technologies"
          :key="technology"
          class="mr-2"
        >
          {{ technology }}
        </v-chip>
      </div>
      <div v-if="links">
        {{ $t("project.link") }}:
        <div v-html="links"></div>
      </div>
      <br />
      <div
        v-if="$te(`projects/${project.id}.description`)"
        class="project-description"
        v-html="$t(`projects/${project.id}.description`)"
      ></div>
      <div v-if="project.preview" class="project-preview">
        <iframe width="800" height="500" :src="project.preview"></iframe>
      </div>
      <div class="project-images">
        <v-carousel v-if="images.length"  background="#ededed" :show-arrows="false">
          <v-carousel-item
            v-for="image in images"
            :src="image"
            :key="image"
          ></v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <v-bottom-navigation absolute grow>
      <v-btn :disabled="!previous" :to="previousHref">
        <v-icon>mdi-arrow-left</v-icon>
        <span>{{ $t("project.previous") }}</span>
      </v-btn>

      <v-btn to="/projects">
        <v-icon>mdi-view-dashboard</v-icon>
        <span>{{ $t("project.goback") }}</span>
      </v-btn>

      <v-btn :disabled="!next" :to="nextHref">
        <v-icon>mdi-arrow-right</v-icon>
        <span>{{ $t("project.next") }}</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
  <div v-else>
    {{ $t("project.notfound") }}
  </div>
</template>
<script>
import { projects } from "../constants";

export default {
  name: "Projet",
  data() {
    return {
      project: null,
      previous: null,
      next: null,
    };
  },
  computed: {
    previousHref() {
      return this.previous ? `/project/${this.previous.id}` : "";
    },
    nextHref() {
      return this.next ? `/project/${this.next.id}` : "";
    },
    images() {
      let images = [];
      for (let i = 1; i < this.project.image_count + 1; i++) {
        images.push(require(`@/assets/projects/${this.project.id}/${i}.png`));
      }
      return images;
    },
    technologies() {
      return this.project.technologies.split("|");
    },
    links() {
      if (!this.project.links) {
        return null;
      }
      let links = this.project.links.split(",");
      links = links.map((link) => {
        let a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.innerText = link;
        return a.outerHTML;
      });
      return links.join(", ");
    },
  },
  created() {
    const index = projects.findIndex(
      (project) => project.id === this.$route.params.id
    );
    this.project = projects[index];
    this.previous = projects[index - 1] || null;
    this.next = projects[index + 1] || null;
  },
};
</script>
<style scoped>
.project-images {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: whitesmoke;
}
.project-description {
  padding-bottom: 20px;
}
.project-preview {
  display: flex;
  justify-content: center;
  border: none;
  background: whitesmoke;
}
.project-preview iframe {
  border: none;
}
.project-content {
  margin-bottom: 40px;
}
</style>