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
  localStorage.setItem("locale", locale.value);
}
</script>

<style scoped>
.locale-btn {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--c-accent);
  background: var(--c-accent-05);
  border: 1px solid var(--c-accent-20);
  border-radius: var(--r-badge);
  padding: 4px 10px;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
  margin: 0 6px;
}

.locale-btn:hover {
  background: var(--c-accent-12);
  border-color: var(--c-accent-50);
}
</style>
