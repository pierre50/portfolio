<template>
  <div class="home">
    <vue-pdf-embed source="/assets/CVPierreNICOLAS.pdf"></vue-pdf-embed>
  </div>
</template>

<script>
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";

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
