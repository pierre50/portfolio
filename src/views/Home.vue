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
      return this.$i18n.locale === 'en'
        ? '/assets/cv-en.pdf'
        : '/assets/cv-fr.pdf';
    }
  }
};
</script>