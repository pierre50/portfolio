<template>
  <v-container class="pa-0">
    <v-img
      v-if="images.length"
      :src="images[selected]"
      class="main-image mb-4"
      :alt="'Image ' + (selected + 1)"
    />
    <v-row v-if="images.length > 1" dense class="thumbnails-row" justify="center">
      <v-col v-for="(img, index) in images" :key="index" :cols="thumbnailCols">
        <v-img
          :src="img"
          aspect-ratio="1"
          class="thumbnail"
          :class="{ 'selected-thumbnail': index === selected }"
          @click="selected = index"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  images: string[];
}>();

const selected = ref(0);

const thumbnailCols = computed(() => {
  const len = props.images.length;
  if (len >= 6) return 2;
  return Math.floor(12 / len);
});
</script>

<style scoped>
.main-image {
  max-width: 600px;
  margin: 0 auto;
}

.thumbnail {
  cursor: pointer;
  border: 1px solid transparent;
  transition: border 0.2s;
  border-radius: 2px;
}

.selected-thumbnail {
  border-color: #1976d2;
}
</style>
