<template>
  <div class="home">
    <VuePdfEmbed :source="pdfSource"></VuePdfEmbed>
  </div>
</template>

<script>
import VuePdfEmbed from "vue-pdf-embed";

export default {
  name: "Home",
  components: {
    VuePdfEmbed,
  },
  computed: {
    pdfSource() {
      // Choisit le PDF selon la langue courante
      return this.$i18n.locale === 'fr'
        ? '/assets/cv-fr.pdf'
        : '/assets/cv-en.pdf';
    }
  }
};
</script>

<style scoped>
.home :deep(.vue-pdf-embed) {
  margin-top: -110px;
}
</style>