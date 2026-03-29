<template>
  <button class="locale-btn" @click="toggle">
    {{ locale === "fr" ? "EN" : "FR" }}
  </button>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function toggle() {
  locale.value = locale.value === "fr" ? "en" : "fr";
}
</script>

<style scoped>
.locale-btn {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #64ffda;
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
  margin: 0 6px;
}

.locale-btn:hover {
  background: rgba(100, 255, 218, 0.12);
  border-color: rgba(100, 255, 218, 0.5);
}
</style>
