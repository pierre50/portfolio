<template>
    <v-app>
        <v-navigation-drawer
        color="#30426A"
        app
        dark
        >
        <v-list
            dense
            nav
            class="py-0"
        >
            <v-list-item two-line>
            <v-list-item-avatar>
                <img style="object-fit: cover;" src="@/assets/profile.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>Pierre NICOLAS</v-list-item-title>
                <v-list-item-subtitle>{{ $t('job') }}</v-list-item-subtitle>
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

            <locale-changer/>
        </v-list>
        </v-navigation-drawer>
        <v-main>
        <v-app-bar 
            dense
            app
            flat
        >
            <v-toolbar-title>{{ $t(title) }}</v-toolbar-title>
    
            <v-spacer></v-spacer>
    
            <v-btn
            icon
            v-if="$route.name === 'project'"
            to="/projects"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-app-bar>
        <v-container fluid>
            <router-view ref="route" :key="$route.name + ($route.params.id || '')"/>
        </v-container>
        </v-main>
    </v-app>
</template>

<script>
import LocaleChanger from './components/locale-changer.vue';
export default {
    data () {
        return {
            items: [
                { title: 'menu.home', icon: 'mdi-home', href: "/" },
                { title: 'menu.projects', icon: 'mdi-view-dashboard', href: "/projects" },
                { title: 'menu.contact', icon: 'mdi-phone', href: "/contact" },
            ],
        }
    },
    computed: {
        title(){
            if (this.$route.name === 'project' && this.$route.params.id){
                const project = this.store.projects.find((project) => project.id === this.$route.params.id);
                if (project){
                    return project.title;
                }
                return 'Error';
            }
            return 'title.' + this.$route.name;
        },
    },
    components: {
        LocaleChanger
    }
}
</script>

<style lang="scss">

</style>
