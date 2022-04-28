<template>
  <v-app>
    <v-navigation-drawer color="#30426A" app left dark v-model="drawer">
      <v-list dense nav class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar size="56">
            <img style="object-fit: cover" src="@/assets/profile.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Pierre NICOLAS</v-list-item-title>
            <v-list-item-subtitle>{{ $t("job") }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.href"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

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
          href="assets/CVPierreNICOLAS.pdf"
          download
        >
          <v-icon>mdi-download</v-icon>
          {{ $t("downloadcv") }}
        </v-btn>
      </v-app-bar>
      <v-container fluid>
        <router-view
          ref="route"
          :key="$route.name + ($route.params.id || '')"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LocaleChanger from "./components/locale-changer.vue";
export default {
  data() {
    return {
      items: [
        { title: "menu.home", icon: "mdi-home", href: "/" },
        {
          title: "menu.projects",
          icon: "mdi-view-dashboard",
          href: "/projects",
        },
        { title: "menu.contact", icon: "mdi-phone", href: "/contact" },
      ],
      drawer: null,
    };
  },
  computed: {
    title() {

      let isPo = false;
      let text = "";
      if (this.$route.name === "project" && this.$route.params.id) {
        const project = this.store.projects.find(
          (project) => project.id === this.$route.params.id
        );
        if (project) {
          text = project.title;
        }else{
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

<style lang="scss">
</style>
