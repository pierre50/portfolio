<template>
  <div class="notfound">
    <span class="notfound-code">404</span>
    <p>{{ $t("notfound.message") }}</p>
    <v-btn to="/" prepend-icon="mdi-home">{{ $t("notfound.back") }}</v-btn>
  </div>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 80px;
  text-align: center;
}

.notfound-code {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.15;
}
</style>
