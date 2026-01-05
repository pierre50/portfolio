<template>
  <div class="locale-changer">
    <v-select
      rounded
      v-model="$i18n.locale"
      variant="plain"
      :items="langs"
      dark
      flat
      dense
      item-value="value"
    >

    </v-select>
  </div>
</template>

<script>
export default {
  name: "locale-changer",
  data() {
    return {
      langs: [{value: "fr", title: "Français"}, {value: "en", title: "English"}],
    };
  },
};
</script>
<style>
.locale-changer {
  position: absolute;
  top: 2px;
  right: 10px;
}
.locale-changer span.v-select__selection-text {
  text-transform: uppercase;
  font-size: 10px;
  margin-top: -8px;
  margin-right: -10px;
  width: 2ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: unset;
  font-family: monospace;
}
.locale-changer .v-input {
  font-size: 11px;
}
.locale-changer .v-icon {
  font-size: 14px !important;
  margin-top: 2px !important;
}
.locale-changer .v-input__append-inner {
  align-self: center !important;
}
.locale-changer .v-input__icon {
  width: 6px;
  min-width: auto;
}
.locale-changer .v-list-item {
  min-height: 20px;
  height: 10px;
}
</style>