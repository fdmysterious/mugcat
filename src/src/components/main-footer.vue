<template lang="pug">
footer.main-footer#footer( role="footer" )
    p <strong>2017 - 2018 Florian Dupeyron.</strong>
    p Code source disponible sur <a href="https://github.com/fdmysterious/mugcat/" target="_blank">Github</a>.
    p Code source sous licence GPLv3. Contenu multimédia sous licence CC-BY-NC v3.
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Provide } from "vue-property-decorator"

@Component({})
export default class Home extends Vue {
    @Provide() mail = "florian.dupeyron@mugcat.fr"
}
</script>

<style lang="scss">
.main-footer {
    @include make-container(
        $size-main-container-fixed,
        $size-main-container-rel,
        $size-main-container-margin
    );

    z-index       : 200;

    margin-top    : $size-main-container-top;
    margin-bottom : 1rem;

    padding : 2em;
    padding-top    : .8em;
    padding-bottom : .8em;
    @media( max-width : $size-mobile ) {
        padding-left  : 1em;
        padding-right : 1em;
        width : 100%;
    }

    color : $color-background-content !important;
    
    p {
        margin : .2em;
        text-align : center;
    }

    & > dl {
        margin-bottom : 0;
    }

    a {
        color : $color-orange;
    }
}
</style>
