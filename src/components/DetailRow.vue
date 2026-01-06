<template>
  <div
    class="detail-row"
    v-if="
      (value !== undefined && value !== null && value !== '') || $slots.default
    "
  >
    <span class="detail-label">
      {{ label }}
    </span>
    <div class="detail-value">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRow",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number, null],
      default: null,
    },
  },
};
</script>

<style scoped>
.detail-row {
  display: flex;
  margin-bottom: 6px;
}

.detail-label {
  width: 150px; /* fixed width */
  color: grey;
  font-weight: 500;
}

.detail-value {
  flex: 1;
}
</style>
