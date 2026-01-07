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
          :prepend-icon="item.icon"
          :title="$t(item.title)"
          :to="item.to"
          :value="title"
          :key="item.title"
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

        <v-toolbar-title>{{
          title.isPo ? $t(title.text) : title.text
        }}</v-toolbar-title>

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
            ref="route"
            :key="$route.name + ($route.params.id || '')"
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

<script>
import { PROJECTS } from "./constants";
import LocaleChanger from "./components/LocaleChanger.vue";
export default {
  data() {
    return {
      items: [
        { title: "menu.home", icon: "mdi-home", to: "/" },
        {
          title: "menu.projects",
          icon: "mdi-view-dashboard",
          to: "/projects",
        },
        {
          title: "Linkedin",
          icon: "mdi-linkedin",
          href: "https://www.linkedin.com/in/pierre-nicolas-62b3a9b2/",
        },
        {
          title: "Github",
          icon: "mdi-github",
          href: "https://github.com/pierre50",
        },
      ],
      drawer: null,
      scrollY: 0,
    };
  },
  methods: {
    downloadFromChild() {
      const cmp = this.$refs.route;
      if (cmp?.downloadPdf) {
        cmp.downloadPdf();
      }
    },
    scrollTop() {
      const main = this.$refs.mainContainer;
      if (main) main.$el.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      const main = this.$refs.mainContainer;
      this.scrollY = main ? main.$el.scrollTop : window.scrollY;
    },
  },
  computed: {
    title() {
      let isPo = false;
      let text = "";
      if (this.$route.name === "project" && this.$route.params.id) {
        const project = PROJECTS.find(
          (project) => project.id === this.$route.params.id,
        );
        if (project) {
          text = project.title;
        } else {
          text = "Error";
        }
      } else {
        isPo = true;
        text = "title." + this.$route.name;
      }
      return {
        isPo,
        text,
      };
    },
  },
  mounted() {
    const main = this.$refs.mainContainer;
    if (main) main.$el.addEventListener("scroll", this.handleScroll);
    else window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    const main = this.$refs.mainContainer;
    if (main) main.$el.removeEventListener("scroll", this.handleScroll);
    else window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    LocaleChanger,
  },
};
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
