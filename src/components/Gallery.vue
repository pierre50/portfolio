<template>
  <div v-if="images.length" class="gallery">
    <!-- Main image -->
    <div class="main-wrap">
      <img
        :src="images[selected]"
        :alt="'Image ' + (selected + 1)"
        class="main-img"
        @click="lightboxOpen = true"
      />
      <div class="main-overlay">
        <v-icon size="20">mdi-magnify-plus-outline</v-icon>
      </div>
      <div class="img-counter">{{ selected + 1 }} / {{ images.length }}</div>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="thumbs">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="thumb-btn"
        :class="{ active: i === selected }"
        @click="selected = i"
      >
        <img :src="img" :alt="'Thumbnail ' + (i + 1)" class="thumb-img" />
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="lightbox"
        @click.self="lightboxOpen = false"
      >
        <button class="lb-close" @click="lightboxOpen = false">
          <v-icon>mdi-close</v-icon>
        </button>
        <button
          v-if="selected > 0"
          class="lb-arrow lb-prev"
          @click="selected--"
        >
          <v-icon size="28">mdi-chevron-left</v-icon>
        </button>
        <img :src="images[selected]" class="lb-img" />
        <button
          v-if="selected < images.length - 1"
          class="lb-arrow lb-next"
          @click="selected++"
        >
          <v-icon size="28">mdi-chevron-right</v-icon>
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = defineProps<{ images: string[] }>();

const selected = ref(0);
const lightboxOpen = ref(false);

function onKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowLeft" && selected.value > 0) selected.value--;
  else if (e.key === "ArrowRight" && selected.value < props.images.length - 1) selected.value++;
  else if (e.key === "Escape") lightboxOpen.value = false;
}

watch(lightboxOpen, (open) => {
  if (open) window.addEventListener("keydown", onKeydown);
  else window.removeEventListener("keydown", onKeydown);
});

onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<style scoped>
/* ── Main image ───────────────────────────────────────────────── */
.gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-wrap {
  position: relative;
  border-radius: var(--r-btn);
  overflow: hidden;
  border: 1px solid var(--c-accent-10);
  cursor: zoom-in;
  background: var(--c-bg-card);
}

.main-img {
  width: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-wrap:hover .main-img {
  transform: scale(1.015);
}

.main-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 14, 23, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-accent);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.main-wrap:hover .main-overlay {
  opacity: 1;
}

.img-counter {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: rgba(204, 214, 246, 0.7);
  background: rgba(10, 14, 23, 0.6);
  padding: 2px 8px;
  border-radius: var(--r-badge);
  backdrop-filter: blur(4px);
}

/* ── Thumbnails ───────────────────────────────────────────────── */
.thumbs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.thumb-btn {
  padding: 0;
  background: none;
  border: 1px solid var(--c-accent-06);
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  transition:
    border-color 0.15s,
    transform 0.15s;
}

.thumb-btn:hover {
  border-color: rgba(100, 255, 218, 0.35);
  transform: translateY(-1px);
}

.thumb-btn.active {
  border-color: var(--c-accent);
  box-shadow: 0 0 8px var(--c-accent-25);
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.7;
  transition: opacity 0.15s;
}

.thumb-btn:hover .thumb-img,
.thumb-btn.active .thumb-img {
  opacity: 1;
}

/* ── Lightbox ─────────────────────────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(5, 8, 15, 0.95);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lb-img {
  max-width: 90vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: var(--r-btn);
  border: 1px solid var(--c-accent-12);
}

.lb-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: var(--r-btn);
  border: 1px solid var(--c-accent-20);
  background: rgba(10, 14, 23, 0.8);
  color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.lb-close:hover {
  background: var(--c-accent-12);
}

.lb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: var(--r-btn);
  border: 1px solid var(--c-accent-20);
  background: rgba(10, 14, 23, 0.8);
  color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
  backdrop-filter: blur(8px);
}

.lb-arrow:hover {
  background: var(--c-accent-12);
  border-color: var(--c-accent-50);
}

.lb-prev {
  left: 16px;
}

.lb-next {
  right: 16px;
}
</style>
