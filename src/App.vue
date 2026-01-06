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
          icon="mdi-download"
          @click="downloadFromChild"
        >
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
  </v-app>
</template>

<script>
import { PROJECTS } from "./constants";
import LocaleChanger from "./components/locale-changer.vue";
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
    };
  },
  methods: {
    downloadFromChild() {
      const cmp = this.$refs.route;
      if (cmp?.downloadPdf) {
        cmp.downloadPdf();
      }
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
  components: {
    LocaleChanger,
  },
};
</script>
