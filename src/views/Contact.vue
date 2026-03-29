<template>
  <div class="contact-page">
    <div class="contact-header" v-reveal>
      <p class="page-label">
        <span class="label-num">03.</span> {{ $t("menu.contact") }}
      </p>
      <h1 class="contact-title">{{ $t("contact.title") }}</h1>
      <p class="contact-sub">{{ $t("contact.sub") }}</p>
    </div>

    <div class="contact-links">
      <!-- Email — copies to clipboard -->
      <button
        class="contact-card"
        v-reveal="{ delay: '0.05s' }"
        @click="copyEmail"
      >
        <div class="contact-icon">
          <v-icon size="26">{{
            copied ? "mdi-check" : "mdi-email-outline"
          }}</v-icon>
        </div>
        <div class="contact-info">
          <span class="contact-label">Email</span>
          <span class="contact-value">tenzin50@hotmail.fr</span>
        </div>
        <span class="contact-action">
          {{ copied ? $t("contact.copied") : $t("contact.copy") }}
        </span>
      </button>

      <!-- External links -->
      <a
        v-for="(item, i) in linkContacts"
        :key="item.title"
        :href="item.href"
        target="_blank"
        class="contact-card"
        v-reveal="{ delay: (i + 1) * 0.08 + 0.05 + 's' }"
      >
        <div class="contact-icon">
          <v-icon size="26">{{ item.icon }}</v-icon>
        </div>
        <div class="contact-info">
          <span class="contact-label">{{ item.title }}</span>
          <span class="contact-value">{{ item.value }}</span>
        </div>
        <v-icon class="contact-arrow" size="16">mdi-arrow-top-right</v-icon>
      </a>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="copied" class="copy-toast">
        <v-icon size="14">mdi-check</v-icon>
        {{ $t("contact.copied") }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const copied = ref(false);

const linkContacts = [
  {
    title: "LinkedIn",
    value: "pierre-nicolas-62b3a9b2",
    href: "https://www.linkedin.com/in/pierre-nicolas-62b3a9b2/",
    icon: "mdi-linkedin",
  },
  {
    title: "GitHub",
    value: "@pierre50",
    href: "https://github.com/pierre50",
    icon: "mdi-github",
  },
];

async function copyEmail() {
  if (copied.value) return;
  await navigator.clipboard.writeText("tenzin50@hotmail.fr");
  copied.value = true;
  setTimeout(() => (copied.value = false), 2200);
}
</script>

<style scoped>
.contact-page {
  padding-top: 2rem;
  max-width: 600px;
  position: relative;
}

.page-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.82rem;
  color: #8892b0;
  margin: 0 0 1.25rem;
}

.label-num {
  color: #64ffda;
}

.contact-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #ccd6f6;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.contact-sub {
  font-size: 1rem;
  color: #8892b0;
  margin: 0 0 3rem;
  line-height: 1.75;
}

/* ── Cards ────────────────────────────────────────────────────── */
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 20px 24px;
  background: #111827;
  border: 1px solid rgba(100, 255, 218, 0.06);
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
}

.contact-card:hover {
  border-color: rgba(100, 255, 218, 0.25);
  background: rgba(100, 255, 218, 0.02);
  transform: translateX(4px);
}

.contact-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: rgba(100, 255, 218, 0.06);
  border: 1px solid rgba(100, 255, 218, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64ffda;
  flex-shrink: 0;
  transition: background 0.2s;
}

.contact-card:hover .contact-icon {
  background: rgba(100, 255, 218, 0.12);
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contact-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ccd6f6;
}

.contact-value {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  color: #8892b0;
}

.contact-action {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  color: #64ffda;
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.2s,
    transform 0.2s;
  white-space: nowrap;
}

.contact-card:hover .contact-action {
  opacity: 1;
  transform: translateX(0);
}

.contact-arrow {
  color: #8892b0;
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.2s,
    transform 0.2s,
    color 0.2s;
}

.contact-card:hover .contact-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #64ffda;
}

/* ── Copy toast ───────────────────────────────────────────────── */
.copy-toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #111827;
  border: 1px solid rgba(100, 255, 218, 0.25);
  border-radius: 8px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  color: #64ffda;
  backdrop-filter: blur(12px);
  z-index: 3000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
