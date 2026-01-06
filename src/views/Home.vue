<template>
  <div class="cv-container">
    <div v-html="renderedMarkdown" class="markdown-content"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';

// Importer les fichiers Markdown
import cvFR from '../assets/cvfr.md?raw';
import cvEN from '../assets/cven.md?raw';

marked.setOptions({
  breaks: true, // interprète un retour à la ligne comme <br>
});

const { locale } = useI18n();
const markdownContent = ref('');

// Détecter la langue
const pdfSource = computed(() => (locale.value === 'fr' ? cvFR : cvEN));

const renderMarkdown = () => {
  markdownContent.value = pdfSource.value;
};

// Computed pour transformer en HTML
const renderedMarkdown = computed(() => marked.parse(markdownContent.value));

onMounted(() => renderMarkdown());

// Re-render si la langue change
watch(locale, () => renderMarkdown());
</script>

<style>
/* Container pour centrer le CV */
.cv-container {
  margin-left: 50px;
  font-family: Georgia, "Times New Roman", Times, serif;
  line-height: 1.6;
  background-color: white;
  color: #333;
}

.cv-container > .markdown-content > *:first-child {
  margin-top: 0 !important;
}

/* Markdown styling */
.markdown-content pre {
  background: #2d2d2d;
  border-radius: 4px;
  margin: 0.5em 0;
  padding: 1em;
  overflow-x: auto;
}

.markdown-content code {
  font-family: 'Fira Code', Consolas, Monaco, monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

.markdown-content :not(pre) > code {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  color: #e83e8c;
}

.markdown-content img {
  max-width: 100%;
}

.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #ddd;
  padding: 8px;
}

.markdown-content th {
  background-color: #f4f4f4;
}

.markdown-content blockquote {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin-left: 0;
  color: #666;
}

.markdown-content h1 {
  font-size: 2.2em;
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

.markdown-content h2 {
  font-size: 1.8em;
  color: #34495e;
  margin: 1.5rem 0;
}

.markdown-content h3 {
  font-size: 1.4em;
  color: #455a64;
}

.markdown-content ul,
.markdown-content ol {
  margin: 1em 0;      /* remet un margin correct */
  padding-left: 2em;  /* indentation classique */
  list-style-position: outside;
  list-style-type: disc; /* pour ul */
}

.markdown-content ol {
  list-style-type: decimal; /* pour ol */
}

.markdown-content li {
  margin: 0.25em 0; /* espace entre les items */
}

.markdown-content hr {
  border: none;             /* retirer les bordures par défaut ou Vuetify */
  border-top: 1px solid #ccc; /* ligne grise fine */
  margin: 2em 0;            /* espacement vertical */
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin-top: 1em;       /* marge avant le titre */
  margin-bottom: 0.5em;  /* marge après le titre */
  font-weight: bold;      /* s'assurer que le texte est en gras */
  color: #2c3e50;        /* votre couleur */
}

.markdown-content h3 {
  font-size: 1.4em;      /* taille spécifique pour h3 */
  color: #455a64;        /* couleur spécifique pour h3 */
}

/* Responsive */
@media (max-width: 600px) {
  .cv-container {
    padding: 10px;
  }

  .markdown-content h1 {
    font-size: 1.8em;
  }

  .markdown-content h2 {
    font-size: 1.5em;
  }

  .markdown-content h3 {
    font-size: 1.2em;
  }
}
</style>
