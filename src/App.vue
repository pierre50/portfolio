<template>
  <v-app>
    <!-- ── Progress bar ───────────────────────────────────────────── -->
    <div class="progress-bar" :style="{ width: scrollProgress + '%' }" />

    <!-- ── Mobile drawer ──────────────────────────────────────────── -->
    <v-navigation-drawer
      v-if="display.smAndDown.value"
      v-model="drawer"
      app
      left
      class="mobile-drawer"
    >
      <div class="drawer-header">
        <span class="drawer-logo">&lt;PN/&gt;</span>
        <span class="drawer-job">{{ $t("job") }}</span>
      </div>

      <v-divider style="border-color: var(--c-accent-10)" />

      <v-list dense nav>
        <v-list-item
          v-for="item in drawerItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="$t(item.title)"
          :to="item.to"
          :value="item.to"
          :href="item.href"
          :target="item.href ? '_blank' : undefined"
        />
      </v-list>

      <div class="drawer-locale">
        <locale-changer />
      </div>

      <div class="drawer-footer">&copy; 2026 Pierre Nicolas</div>
    </v-navigation-drawer>

    <!-- ── App bar ────────────────────────────────────────────────── -->
    <v-app-bar flat class="glass-nav" height="64">
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        @click.stop="drawer = !drawer"
      />

      <router-link to="/" class="brand-link ms-2">
        <span class="brand-bracket">&lt;</span>PN<span class="brand-bracket"
          >/&gt;</span
        >
      </router-link>

      <v-spacer />

      <nav class="desktop-nav d-none d-md-flex">
        <router-link
          v-for="(item, i) in navItems"
          :key="item.title"
          :to="item.to!"
          class="nav-link"
          :class="{
            active:
              route.path === item.to ||
              (item.to !== '/' && route.path.startsWith(item.to!)),
          }"
        >
          <span class="nav-num">0{{ i + 1 }}.</span>
          {{ $t(item.title) }}
        </router-link>
      </nav>

      <div class="d-none d-md-flex ext-links">
        <a
          v-for="link in externalLinks"
          :key="link.icon"
          :href="link.href"
          target="_blank"
          class="ext-icon-link"
        >
          <v-icon size="20">{{ link.icon }}</v-icon>
        </a>
      </div>

      <locale-changer />
    </v-app-bar>

    <v-main class="site-main">
      <div class="dot-grid" />
      <div class="page-container">
        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            :key="String(route.name) + String(route.params.id || '')"
          />
        </router-view>
      </div>
    </v-main>

    <!-- ── Scroll-to-top ──────────────────────────────────────────── -->
    <button
      v-show="scrollY > 300"
      class="scroll-top-btn"
      @click="scrollTop"
      aria-label="Scroll to top"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </button>

    <!-- ── Keyboard shortcuts hint ────────────────────────────────── -->
    <div class="kb-hints d-none d-md-flex">
      <span v-for="s in shortcuts" :key="s.key" class="kb-hint">
        <kbd class="kb-key">{{ s.key.toUpperCase() }}</kbd>
        {{ s.label }}
      </span>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import LocaleChanger from "./components/LocaleChanger.vue";

const route = useRoute();
const router = useRouter();
const display = useDisplay();

const drawer = ref<boolean | null>(null);
const scrollY = ref(0);

/* ── Nav definitions ──────────────────────────────────────────── */
interface NavItem {
  title: string;
  icon: string;
  to?: string;
  href?: string;
}

interface ExternalLink {
  icon: string;
  href: string;
}

interface Shortcut {
  key: string;
  label: string;
  to?: string;
  href?: string;
}

const navItems: NavItem[] = [
  { title: "menu.home", icon: "mdi-home", to: "/" },
  { title: "menu.projects", icon: "mdi-view-dashboard", to: "/projects" },
  { title: "menu.contact", icon: "mdi-email", to: "/contact" },
];

const externalLinks: ExternalLink[] = [
  {
    icon: "mdi-linkedin",
    href: "https://www.linkedin.com/in/pierre-nicolas-62b3a9b2/",
  },
  { icon: "mdi-github", href: "https://github.com/pierre50" },
];

const drawerItems: NavItem[] = [
  ...navItems,
  {
    title: "Linkedin",
    icon: "mdi-linkedin",
    href: "https://www.linkedin.com/in/pierre-nicolas-62b3a9b2/",
  },
  { title: "Github", icon: "mdi-github", href: "https://github.com/pierre50" },
];

const shortcuts: Shortcut[] = [
  { key: "h", label: "Home", to: "/" },
  { key: "p", label: "Projects", to: "/projects" },
  { key: "c", label: "Contact", to: "/contact" },
  { key: "g", label: "GitHub", href: "https://github.com/pierre50" },
  {
    key: "l",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pierre-nicolas-62b3a9b2/",
  },
];

/* ── Computed ─────────────────────────────────────────────────── */
const scrollProgress = computed(() => {
  if (typeof window === "undefined") return 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  return scrollable <= 0
    ? 0
    : Math.min(100, (scrollY.value / scrollable) * 100);
});

/* ── Methods ──────────────────────────────────────────────────── */
function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleScroll() {
  scrollY.value = window.scrollY;
}

function handleKeydown(e: KeyboardEvent) {
  if (
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement
  )
    return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const s = shortcuts.find((x) => x.key === e.key.toLowerCase());
  if (!s) return;
  if (s.href) window.open(s.href, "_blank");
  else if (s.to) router.push(s.to);
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style>
/* ── Global fonts & resets ────────────────────────────────────── */
body,
.v-application {
  font-family: "Space Grotesk", sans-serif !important;
}

/* ── Scroll reveal ────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ── Progress bar ─────────────────────────────────────────────── */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(to right, var(--c-accent), var(--c-purple));
  z-index: 9999;
  transition: width 0.1s linear;
  pointer-events: none;
  box-shadow: 0 0 8px rgba(100, 255, 218, 0.45);
}

/* ── Glassmorphism nav ────────────────────────────────────────── */
.glass-nav.v-app-bar {
  background: rgba(10, 14, 23, 0.88) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid var(--c-accent-08) !important;
  box-shadow: none !important;
}

/* ── Brand logo ───────────────────────────────────────────────── */
.brand-link {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-accent);
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: opacity 0.2s;
}

.brand-link:hover {
  opacity: 0.75;
}

.brand-bracket {
  color: var(--c-purple);
}

/* ── Desktop nav ──────────────────────────────────────────────── */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--c-muted);
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link .nav-num {
  color: var(--c-accent);
  font-size: 0.72rem;
}

.nav-link:hover,
.nav-link.active {
  color: var(--c-accent);
}

/* ── External icon links ──────────────────────────────────────── */
.ext-links {
  align-items: center;
  gap: 2px;
  margin: 0 8px;
}

.ext-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--c-muted);
  text-decoration: none;
  border-radius: 6px;
  transition:
    color 0.2s,
    background 0.2s;
}

.ext-icon-link:hover {
  color: var(--c-accent);
  background: var(--c-accent-08);
}

/* ── Main area ────────────────────────────────────────────────── */
.site-main {
  background: var(--c-bg);
  min-height: 100vh;
  position: relative;
}

.dot-grid {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(
    var(--c-accent-04) 1px,
    transparent 1px
  );
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}

.page-container {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

/* ── Scroll-to-top ────────────────────────────────────────────── */
.scroll-top-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
  width: 40px;
  height: 40px;
  border-radius: var(--r-btn);
  border: 1px solid rgba(100, 255, 218, 0.3);
  background: rgba(10, 14, 23, 0.9);
  color: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
  backdrop-filter: blur(8px);
}

.scroll-top-btn:hover {
  background: var(--c-accent-12);
  border-color: var(--c-accent);
}

/* ── Keyboard shortcuts hint ──────────────────────────────────── */
.kb-hints {
  position: fixed;
  bottom: 20px;
  left: 24px;
  z-index: 1000;
  display: flex;
  gap: 14px;
  align-items: center;
  opacity: 0.2;
  transition: opacity 0.25s;
}

.kb-hints:hover {
  opacity: 0.85;
}

.kb-hint {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--c-muted);
}

.kb-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid var(--c-muted-25);
  border-bottom-width: 2px;
  border-radius: var(--r-tag);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  font-weight: 600;
  color: var(--c-accent);
  background: var(--c-accent-04);
}

/* ── Mobile drawer ────────────────────────────────────────────── */
.mobile-drawer.v-navigation-drawer {
  background: var(--c-bg-darker) !important;
  border-right: 1px solid var(--c-accent-08) !important;
}

.drawer-header {
  padding: 28px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.drawer-logo {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--c-accent);
}

.drawer-job {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--c-muted);
}

.drawer-locale {
  padding: 8px 16px;
}

.drawer-footer {
  padding: 12px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-footer);
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
