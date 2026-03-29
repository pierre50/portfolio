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
    sets: {
      mdi,
    },
  },
  defaults: {
    VCard: { rounded: "xl" },
    VBtn: { rounded: "xl" },
    VChip: { rounded: "lg" },
    VTextField: { rounded: "lg", variant: "outlined" },
    VTextarea: { rounded: "lg", variant: "outlined" },
    VSelect: { rounded: "lg", variant: "outlined" },
    VAlert: { rounded: "lg" },
    VSheet: { rounded: "xl" },
    VDialog: { rounded: "xl" },
    VMenu: { rounded: "xl" },
    VList: { rounded: "xl" },
    VSnackbar: { rounded: "xl" },
  },
  theme: {
    defaultTheme: "light",
  },
});
