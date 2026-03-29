import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    sets: { mdi },
  },
  defaults: {
    VCard: { rounded: "lg" },
    VBtn: { rounded: "lg" },
    VChip: { rounded: "sm" },
    VTextField: { rounded: "lg", variant: "outlined" },
    VTextarea: { rounded: "lg", variant: "outlined" },
    VSelect: { rounded: "lg", variant: "outlined" },
    VAlert: { rounded: "lg" },
    VSheet: { rounded: "lg" },
    VDialog: { rounded: "lg" },
    VMenu: { rounded: "lg" },
    VList: { rounded: "lg" },
    VSnackbar: { rounded: "lg" },
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#0a0e17",
          surface: "#111827",
          "surface-variant": "#1a2540",
          primary: "#64ffda",
          secondary: "#7c3aed",
          error: "#ff6b6b",
          warning: "#ffd166",
          info: "#74b9ff",
          success: "#64ffda",
          "on-background": "#ccd6f6",
          "on-surface": "#ccd6f6",
          "on-primary": "#0a0e17",
        },
      },
    },
  },
});
