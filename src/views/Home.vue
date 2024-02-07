<template>
  <div class="home">
    <VuePdfEmbed source="/assets/CVPierreNICOLAS.pdf"></VuePdfEmbed>
  </div>
</template>

<script>
import VuePdfEmbed from "vue-pdf-embed";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    VuePdfEmbed,
  },
};
</script>
