<template>
    <div v-if="project">
        <div class="content">
            <div v-if="project.type">{{ $t('project.type') }}: {{ $t(`project.type.${project.type}`) }}</div>
            <div v-if="project.year">{{ $t('project.year') }}: {{ project.year }}</div>
            <div v-if="project.length">{{ $t('project.length') }}: {{ project.length }}</div>
            <div v-if="project.status">{{ $t('project.status') }}: {{ $t(`project.status.${project.status}`) }}</div>
            <div v-if="technologies.length">{{ $t('project.technologies') }}: 
                <v-chip v-for="technology in technologies" :key="technology">
                    {{ technology }}
                </v-chip>
            </div>
            <div v-if="links">{{ $t('project.link') }}: <div v-html="links"></div></div>
            <br>
            <div v-html="$t(`${project.id}.description`)"></div>

            <div class="images">
                <v-img 
                    v-for="image in images" 
                    :src="image" 
                    :key="image"
                    contain
                    max-height="300"
                    max-width="500"
                />
            </div>
        </div>
        <v-bottom-navigation
            absolute
            grow
        >
            <v-btn :disabled="!previous" :to="previousHref">
                <span>{{ $t('project.previous') }}</span>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        
            <v-btn to="/projects">
                <span>{{ $t('project.goback') }}</span>
                <v-icon>mdi-view-dashboard</v-icon>
            </v-btn>
        
            <v-btn :disabled="!next" :to="nextHref">
                <span>{{ $t('project.next') }}</span>
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
    <div v-else>
        {{ $t('project.notfound') }}
    </div>
</template>
<script>
export default {
    name: 'Projet',
    data(){
        return{
            project: null,
            previous: null,
            next: null,
        }
    },
    computed:{
        previousHref(){
            return this.previous ? `/project/${this.previous.id}` : '';
        },
        nextHref(){
            return this.next ? `/project/${this.next.id}` : '';
        },
        images(){
            let images = [];
            for (let i = 1; i < this.project.image_count + 1; i++){
                images.push(require(`@/assets/projects/${this.project.id}/${i}.png`));
            }
            return images;
        },
        technologies(){
            return this.project.technologies.split('|');
        },
        links(){
            if (!this.project.links){
                return null;
            }
            let links = this.project.links.split(',');
            links = links.map(link => {
                let a = document.createElement('a');
                a.href = link;
                a.target = '_blank';
                a.innerText = link;
                return a.outerHTML;
            })
            return links.join(', ');
        }
    },
    created(){
        const index = this.store.projects.findIndex((project) => project.id === this.$route.params.id);
        this.project = this.store.projects[index];
        this.previous = this.store.projects[index - 1] || null;
        this.next = this.store.projects[index + 1] || null;
    }
}
</script>
<style scoped>
.images{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.images > .v-image{
    margin: 15px;
}
.content{
    margin-bottom: 40px;
}
</style>