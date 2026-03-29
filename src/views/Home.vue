<template>
  <div class="cv-container" ref="contentRef">
    <div v-html="renderedMarkdown" class="markdown-content"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { marked } from "marked";

import cvFR from "../assets/cvfr.md?raw";
import cvEN from "../assets/cven.md?raw";

marked.setOptions({
  breaks: true,
});

const { locale } = useI18n();
const contentRef = ref<HTMLElement | null>(null);

const pdfSource = computed(() => (locale.value === "fr" ? cvFR : cvEN));
const renderedMarkdown = computed(() => marked.parse(pdfSource.value));

const downloadPdf = async () => {
  if (!contentRef.value) return;
  const html2pdf = (await import("html2pdf.js")).default;
  html2pdf(contentRef.value, {
    filename: locale.value === "fr" ? "CV-Pierre-Nicolas.pdf" : "CV-Pierre-Nicolas-EN.pdf",
    margin: 10,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4" },
  });
};

defineExpose({ downloadPdf });
</script>

<style scoped>
.cv-container {
  line-height: 1.6;
  background-color: white;
  color: #333;
}

.cv-container > :deep(.markdown-content > *:first-child) {
  margin-top: 0 !important;
}

:deep(.markdown-content pre) {
  background: #2d2d2d;
  border-radius: 4px;
  margin: 0.5em 0;
  padding: 1em;
  overflow-x: auto;
}

:deep(.markdown-content code) {
  font-family: "Fira Code", Consolas, Monaco, monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: anywhere;
}

:deep(.markdown-content :not(pre) > code) {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  color: #e83e8c;
}

:deep(.markdown-content img) {
  max-width: 100%;
}

:deep(.markdown-content table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

:deep(.markdown-content th),
:deep(.markdown-content td) {
  border: 1px solid #ddd;
  padding: 8px;
}

:deep(.markdown-content th) {
  background-color: #f4f4f4;
}

:deep(.markdown-content blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin-left: 0;
  color: #666;
}

:deep(.markdown-content h1) {
  font-size: 2.2em;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
}

:deep(.markdown-content h2) {
  font-size: 1.8em;
  margin: 1.5rem 0;
}

:deep(.markdown-content h3) {
  font-size: 1.4em;
}

:deep(.markdown-content h1),
:deep(.markdown-content h2),
:deep(.markdown-content h3) {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(.markdown-content ul),
:deep(.markdown-content ol) {
  margin: 1em 0;
  padding-left: 2em;
  list-style-position: outside;
  list-style-type: disc;
}

:deep(.markdown-content ol) {
  list-style-type: decimal;
}

:deep(.markdown-content li) {
  margin: 0.25em 0;
}

:deep(.markdown-content hr) {
  border: none;
  border-top: 1px solid #ccc;
  margin: 2em 0;
}

@media (max-width: 600px) {
  :deep(.markdown-content h1) {
    font-size: 1.8em;
  }

  :deep(.markdown-content h2) {
    font-size: 1.5em;
  }

  :deep(.markdown-content h3) {
    font-size: 1.2em;
  }
}
</style>
