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
          v-if="projectLength"
          :label="$t('project.length')"
          :value="projectLength"
        />
        <DetailRow
          v-if="project.status"
          :label="$t('project.status.default')"
          :value="$t(`project.status.${project.status}`)"
        />
        <DetailRow
          v-if="project.technologies.length"
          :label="$t('project.technologies')"
        >
          <span class="technologies">
            <v-chip v-for="tech in project.technologies" :key="tech">
              {{ tech }}
            </v-chip>
          </span>
        </DetailRow>

        <DetailRow v-if="project.links?.length" :label="$t('project.link')">
          <div class="links">
            <a
              v-for="link in project.links"
              :key="link"
              :href="link"
              target="_blank"
            >{{ link }}</a>
          </div>
        </DetailRow>

        <v-divider class="my-4"></v-divider>
        <div
          v-if="$te(`projects.${project.id}.description`)"
          class="project-description"
          v-html="$t(`projects.${project.id}.description`)"
        ></div>
      </div>
    </div>

    <v-bottom-navigation fixed grow>
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

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { PROJECTS, type Project } from "../constants";
import Galery from "../components/Galery.vue";
import DetailRow from "../components/DetailRow.vue";

const route = useRoute();
const { locale } = useI18n();

const projectImages = import.meta.glob("../assets/projects/*/*.png", {
  eager: true,
  as: "url",
});

const index = computed(() =>
  PROJECTS.findIndex((p) => p.id === route.params.id)
);
const project = computed<Project | null>(() => PROJECTS[index.value] ?? null);
const previous = computed<Project | null>(() => PROJECTS[index.value - 1] ?? null);
const next = computed<Project | null>(() => PROJECTS[index.value + 1] ?? null);

const previousHref = computed(() =>
  previous.value ? `/project/${previous.value.id}` : ""
);
const nextHref = computed(() =>
  next.value ? `/project/${next.value.id}` : ""
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
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 768px) {
  .project-content {
    flex-direction: column;
  }
}
</style>
