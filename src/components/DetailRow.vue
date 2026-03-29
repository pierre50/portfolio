<template>
  <div
    class="detail-row"
    v-if="
      (value !== undefined && value !== null && value !== '') || $slots.default
    "
  >
    <span class="detail-label">{{ label }}</span>
    <div class="detail-value">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    value?: string | number | null;
  }>(),
  {
    label: "",
    value: null,
  },
);
</script>

<style scoped>
.detail-row {
  display: flex;
  margin-bottom: 6px;
}

.detail-label {
  width: 150px;
  color: grey;
  font-weight: 500;
}

.detail-value {
  flex: 1;
}
</style>
