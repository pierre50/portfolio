<template>
  <div v-if="project">
    <div class="project-content">
      <div v-if="project.preview" class="project-preview">
        <iframe width="100%" height="500" :src="project.preview"></iframe>
      </div>
      <div v-if="images.length" class="project-images">
        <galery :images="images" />
      </div>
      <div class="project-description">
        <DetailRow
          v-if="project.type"
          :label="$t('project.type.default')"
          :value="$t(`project.type.${project.type}`)"
        />
        <DetailRow
          v-if="project.year"
          :label="$t('project.year')"
          :value="project.year"
        />
        <DetailRow
          v-if="project.length"
          :label="$t('project.length')"
          :value="
            typeof project.length === 'object'
              ? project.length[$i18n.locale]
              : project.length
          "
        />
        <DetailRow
          v-if="project.status"
          :label="$t('project.status.default')"
          :value="$t(`project.status.${project.status}`)"
        />
        <DetailRow
          v-if="technologies.length"
          :label="$t('project.technologies')"
        >
          <span class="technologies">
            <v-chip
              v-for="technology in technologies"
              :key="technology"
              class="mr-2"
            >
              {{ technology }}
            </v-chip>
          </span>
        </DetailRow>

        <DetailRow v-if="links" :label="$t('project.link')">
          <div v-html="links"></div>
        </DetailRow>

        <v-divider class="my-4"></v-divider>
        <div
          v-if="$te(`projects.${project.id}.description`)"
          class="project-description"
          v-html="$t(`projects.${project.id}.description`)"
        ></div>
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
<script lang="ts">
import { defineComponent } from "vue";
import { PROJECTS } from "../constants";
import Galery from "../components/Galery.vue";
import DetailRow from "../components/DetailRow.vue";

export default defineComponent({
  name: "Project",
  data() {
    return {
      project: null as any,
      previous: null as any,
      next: null as any,
    };
  },
  computed: {
    previousHref() {
      return this.previous ? `/project/${this.previous.id}` : "";
    },
    nextHref() {
      return this.next ? `/project/${this.next.id}` : "";
    },
    images(): string[] {
      if (!this.project) return [];

      // Glob dynamique de toutes les images projets
      const modules = import.meta.glob("../assets/projects/*/*.png", {
        eager: true,
        as: "url",
      });
      const imgs: string[] = [];

      for (let i = 1; i <= this.project.image_count; i++) {
        const key = `../assets/projects/${this.project.id}/${i}.png`;
        if (modules[key]) imgs.push(modules[key]);
      }

      return imgs;
    },
    technologies(): string[] {
      return this.project?.technologies
        ? this.project.technologies.split("|")
        : [];
    },
    links(): string | null {
      if (!this.project?.links) return null;
      const links = this.project.links.split(",").map((link: string) => {
        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.innerText = link;
        return a.outerHTML;
      });
      return links.join(", ");
    },
  },
  created() {
    const index = PROJECTS.findIndex(
      (project) => project.id === this.$route.params.id,
    );
    this.project = PROJECTS[index] || null;
    this.previous = PROJECTS[index - 1] || null;
    this.next = PROJECTS[index + 1] || null;
  },
  components: {
    Galery,
    DetailRow,
  },
});
</script>

<style scoped>
.project-content {
  display: flex;
  flex-direction: row;
  gap: 20px;

  > * {
    flex: 1;
  }
}
.project-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.project-preview iframe {
  border: none;
  border-radius: 3px;
}
</style>
