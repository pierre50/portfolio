<template>
  <v-app>
    <v-navigation-drawer
      image="/assets/bg.jpg"
      app
      left
      theme="dark"
      v-model="drawer"
    >
      <v-list dense nav>
        <v-list-item
          lines="two"
          prepend-avatar="/assets/profile.jpg"
          title="Pierre NICOLAS"
          :subtitle="$t('job')"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="$t(item.title)"
          :to="item.to"
          :value="item.to"
          :href="item.href"
          :target="item.href && '_blank'"
        ></v-list-item>

        <locale-changer />
      </v-list>
      <div class="drawer-footer">&copy; 2026 Pierre NICOLAS</div>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar dense app flat>
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon v-if="$route.name === 'project'" to="/projects">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-btn
          v-if="$route.name === 'home'"
          class="d-flex align-center me-2"
          prepend-icon="mdi-download"
          @click="downloadFromChild"
        >
          <span class="d-none d-sm-inline">{{ $t("downloadcv") }}</span>
          <span class="d-inline d-sm-none">CV</span>
        </v-btn>
      </v-app-bar>
      <v-container fluid>
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            ref="routeRef"
            :key="String($route.name) + String($route.params.id || '')"
          />
        </router-view>
      </v-container>
    </v-main>
    <v-btn
      icon
      v-show="scrollY > 300"
      color="white"
      class="scroll-top-btn"
      @click="scrollTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { PROJECTS } from "./constants";
import LocaleChanger from "./components/LocaleChanger.vue";

const route = useRoute();
const { t } = useI18n();

const drawer = ref<boolean | null>(null);
const scrollY = ref(0);
const routeRef = ref<{ downloadPdf?: () => void } | null>(null);

const items = [
  { title: "menu.home", icon: "mdi-home", to: "/" },
  { title: "menu.projects", icon: "mdi-view-dashboard", to: "/projects" },
  { title: "menu.contact", icon: "mdi-email", to: "/contact" },
  { title: "Linkedin", icon: "mdi-linkedin", href: "https://www.linkedin.com/in/pierre-nicolas-62b3a9b2/" },
  { title: "Github", icon: "mdi-github", href: "https://github.com/pierre50" },
];

const title = computed(() => {
  if (route.name === "project" && route.params.id) {
    const project = PROJECTS.find((p) => p.id === route.params.id);
    return project?.title ?? "Error";
  }
  return t(`title.${String(route.name)}`);
});

function downloadFromChild() {
  routeRef.value?.downloadPdf?.();
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleScroll() {
  scrollY.value = window.scrollY;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<style>
.scroll-top-btn {
  position: fixed !important;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
}

.drawer-footer {
  padding: 12px;
  text-align: center;
  font-size: 12px;
  color: white;
  opacity: var(--v-medium-emphasis-opacity);
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
