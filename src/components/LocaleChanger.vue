<template>
  <div class="locale-changer">
    <v-select
      v-model="locale"
      variant="plain"
      :items="langs"
      item-value="value"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const langs = [
  { value: "fr", title: "Français" },
  { value: "en", title: "English" },
];
</script>

<style scoped>
.locale-changer {
  position: absolute;
  top: 2px;
  right: 10px;
}

.locale-changer :deep(.v-select__selection-text) {
  text-transform: uppercase;
  font-size: 10px;
  margin-top: -8px;
  margin-right: -10px;
  width: 2ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: unset;
  font-family: monospace;
}

.locale-changer :deep(.v-input) {
  font-size: 11px;
}

.locale-changer :deep(.v-icon) {
  font-size: 14px !important;
  margin-top: 2px !important;
}

.locale-changer :deep(.v-input__append-inner) {
  align-self: center !important;
}

.locale-changer :deep(.v-input__icon) {
  width: 6px;
  min-width: auto;
}

.locale-changer :deep(.v-list-item) {
  min-height: 20px;
  height: 10px;
}
</style>
