<template>
    <div class="locale-changer">
        <v-select 
            v-model="$i18n.locale"
            :items="langs"
            dark
            shaped
            flat
            dense
        >
        </v-select>
    </div>
</template>

<script>
export default {
    name: 'locale-changer',
    data () {
        return { 
            langs: ['fr', 'en'] 
        }
    },
}
</script>
<style>
.locale-changer{
    position: absolute;
    top: 6px;
    right: 10px;
    width: 30px;
}
.locale-changer .v-input{
    font-size: 11px;
}
.locale-changer .v-icon{
    font-size: 14px!important;
    margin-top: 2px!important;
}
.locale-changer .v-input__append-inner {
    align-self: center!important;
}
.locale-changer .v-input__icon{
    width: 6px;
    min-width: auto;
}
.locale-changer .v-list-item{
    min-height: 20px;
    height: 10px;
}
</style>