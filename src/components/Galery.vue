<template>
  <v-container class="pa-0">
    <!-- Main Image -->
    <v-img
      v-if="images.length"
      :src="images[selected]"
      class="main-image mb-4"
      :alt="'Image ' + (selected + 1)"
    ></v-img>

    <!-- Thumbnails -->
    <v-row
      v-if="images.length > 1"
      dense
      class="thumbnails-row"
      justify="center"
    >
      <v-col v-for="(img, index) in images" :key="index" :cols="thumbnailCols">
        <v-img
          :src="img"
          aspect-ratio="1"
          class="thumbnail"
          :class="{ 'selected-thumbnail': index === selected }"
          @click="selected = index"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Galery",
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      selected: 0,
    };
  },
  computed: {
    // Main image
    selectedImage() {
      return this.images[this.selected];
    },
    // Dynamic thumbnail width
    thumbnailCols() {
      const len = this.images.length;
      if (len >= 6) return 2; // max 6 per row
      return Math.floor(12 / len);
    },
  },
};
</script>

<style scoped>
.main-image {
  max-width: 600px;
  margin: 0 auto;
}

.thumbnail {
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s;
  border-radius: 4px;
}

.selected-thumbnail {
  border-color: #1976d2;
}
</style>
